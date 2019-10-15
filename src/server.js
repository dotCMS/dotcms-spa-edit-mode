import express from 'express';
import next from'next';
import fetch from 'node-fetch';
import querystring from 'query-string';
import proxy from 'express-http-proxy';
import path from 'path';
import bodyParser from 'body-parser';
import dotcmsApi from '../backend/dotcmsApi';
import transformPage from './utils/transformPage';

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handleByNext = app.getRequestHandler()
const isHTMLExt = (url) => {
    const ext = path.parse(url).ext;
    return (ext.length === 0) || ext === '.html';
};
const isPage = (url) => {
    return !isNextInternalFile(url) && !isAPIRequest(url) && isHTMLExt(url);
};

const renderPage = (pageState, req, res) => {
    const actualPage = '/index';
    const queryParams = { pageState: pageState }; 
    app.render(req, res, actualPage, queryParams);
};
const requestDOTCMSStaticFile = (req, res) =>  proxy(`http://demo.dotcms.com${req.url}`)(req, res);

const internalPrefixes = [/^\/_next\//, /^\/static\//];
const isNextInternalFile = (url) => {
    for (const prefix of internalPrefixes) {
        if (prefix.test(url)) {
          return true
        }
      }
    
      return false
};
const isAPIRequest = (url) => url.startsWith('/api');
const requestPage = async (req, res) => {
    let pageState;

    try {
        const pageAsset = await dotcmsApi.page.get({
            language: '1',
            url: req.url + "?fireRules=true"
        });

        const { layout, error, viewAs, page } = transformPage(pageAsset);

        pageState = {
            error: error,
            layout,
            mode: viewAs ? viewAs.mode : '',
            //location,
            title: page ? page.title : ''
        };

    } catch(err) {
        pageState = {
            ...this.state,
            error: err.status
        };
    };

    renderPage(pageState, req, res);
};
const requestToDotCMS = async (req, res) => {
    console.log('req.url', req.url);
    console.log('isPage(req.url)', isPage(req.url));
    if (isPage(req.url)) {    
        await requestPage(req, res);
    } else {
        await requestDOTCMSStaticFile(req, res);
    } 
};

app.prepare().then(() => {
    const server = express();

    const jsonParser = bodyParser.raw({ type: 'application/x-www-form-urlencoded' });

    server.all('/api/*', async (req, res) => {
        const dotcmsRes = await fetch(`http://demo.dotcms.com${req.url}`, {
            method: req.method,
            headers: {
                'content-type': 'application/json',
                authorization: 'Basic YWRtaW5AZG90Y21zLmNvbTphZG1pbg=='
            }
        });
        const json = await dotcmsRes.json();
        res.status(dotcmsRes.status).json(json);
    });

    server.post('*', jsonParser, (req, res) => {
        const page =  JSON.parse(querystring.parse(req.body.toString()).dotPageData).entity;
        renderPage(page, req, res);
    });

    server.get('/contentAsset/*', async (req, res) => requestStaticFile(req, res));

    server.get('*', async (req, res) => {
        try {
            if (isNextInternalFile(req.url)) {
                handleByNext (req, res);
            } else {
                await requestToDotCMS(req, res);
            }
        } catch(e) {
            handleByNext (req, res);
        }
    });
    
    server.listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    });
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

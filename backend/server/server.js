import fs from 'fs';
import http from 'http';
import path from 'path';
import url from 'url';
import { parse } from 'querystring';
import Loadable from 'react-loadable';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import httpProxy from 'http-proxy';

import dotcmsApi from '../dotcmsApi';
import transformPage from '../../src/utils/transformPage';

import App from '../../src/App';

const { protocol, hostname, port } = url.parse(process.env.REACT_APP_DOTCMS_HOST);
const proxy = httpProxy.createProxyServer({
    target: {
        protocol: protocol,
        host: hostname,
        port: port,
        pfx: fs.readFileSync('./backend/server/fakecert.txt'),
        passphrase:
            'atProxyServer.28039964-5615-4ccf-bb96-ded62adbcc6a28039964-5615-4ccf-bb96-ded62adbcc6a'
    },
    changeOrigin: true
});

let currentSite;

const STATIC_FOLDER = './build';

const isThisAPage = (pathname) => {
    const ext = path.parse(pathname).ext;
    return (!pathname.startsWith('/api') && ext.length === 0) || ext === '.html';
};

const getScript = (payload) => {
    const { rendered, ...page } = payload.page || {};
    const { layout, viewAs } = payload || {};

    if (payload) {
        return `
        <script type="${mimeType['.js']}">
            var dotcmsPage = ${JSON.stringify({
                layout,
                viewAs,
                page,
                site: currentSite
            })}
        </script>`;
    } else {
        return '';
    }
};

const getMainComponent = (url, payload) => {
    const modules = [];
    const context = {};
    const { layout, viewAs, page } = payload || {};
    return (
        <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
            <StaticRouter location={url} context={context}>
                {payload ? (
                    <App
                        payload={{
                            layout,
                            viewAs,
                            page,
                            site: currentSite
                        }}
                    />
                ) : (
                    <App />
                )}
            </StaticRouter>
        </Loadable.Capture>
    );
};

// maps file extention to MIME types
const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
};

const server = http.createServer((request, response) => {
    const isEditModeFromDotCMS = request.method === 'POST' && !request.url.startsWith('/api');

    if (isEditModeFromDotCMS) {
        var postData = '';

        // Get all post data when receive data event.
        request.on('data', function(chunk) {
            postData += chunk;
        });

        // When all request post data has been received.
        request.on('end', function() {
            // Parse the post data and get client sent username and password.
            // let postDataObject = JSON.parse(postData);
            let payload = transformPage(JSON.parse(parse(postData).dotPageData).entity);

            // The post request should have remoteRendered, double check with Will.
            payload = {
                ...payload,
                page: {
                    ...payload.page,
                    remoteRendered: isEditModeFromDotCMS
                }
            };

            fs.readFile(`${STATIC_FOLDER}/index.html`, 'utf8', (err, data) => {
                const app = renderToString(getMainComponent(request.url, payload));
                data = data.replace('<div id="root"></div>', `<div id="root">${app}</div>`);
                data = data.replace('<div id="script"></div>', getScript(payload));

                response.setHeader('Content-type', mimeType['.html'] || 'text/plain');
                response.end(data);
            });
        });
    } else {
        const parsedUrl = url.parse(request.url);

        // extract URL path
        // Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
        // e.g curl --path-as-is http://localhost:9000/../fileInDanger.txt
        // by limiting the path to current directory only
        const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');

        if (isThisAPage(sanitizePath)) {
            fs.readFile(`${STATIC_FOLDER}/index.html`, 'utf8', (err, data) => {
                const app = renderToString(getMainComponent(request.url));
                data = data.replace('<div id="root"></div>', `<div id="root">${app}</div>`);

                response.setHeader('Content-type', mimeType['.html'] || 'text/plain');
                response.end(data);
            });
        } else {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Credentials', 'true');
            response.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
            response.setHeader(
                'Access-Control-Allow-Headers',
                'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
            );

            const pathname = path.join(STATIC_FOLDER, sanitizePath);

            fs.exists(pathname, (exist) => {
                if (!exist || request.url.startsWith('/api')) {
                    // if the file is not found un build folder, proxy to dotcms instance

                    proxy.web(request, response);
                    return;
                }

                // read file from file system (build folder)
                fs.readFile(pathname, (err, data) => {
                    if (err) {
                        response.statusCode = 500;
                        response.end(`Error getting the file: ${err}.`);
                    } else {
                        const parsedPath = path.parse(pathname);

                        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                        const ext = parsedPath.ext;

                        // if the file is found, set Content-type and send data
                        response.setHeader('Content-type', mimeType[ext] || 'text/plain');
                        response.end(data);
                    }
                });
            });
        }
    }
});

// We tell React Loadable to load all required assets and start listening.
Loadable.preloadAll().then(async () => {
    currentSite = await dotcmsApi.site.getCurrentSite();
    server.listen(process.env.PORT || 5000, (err) => {
        console.log('Server running http://localhost:5000');
    });
});

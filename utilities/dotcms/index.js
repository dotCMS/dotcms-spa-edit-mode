const fetch = require('isomorphic-fetch');

import getPage from './getPage';
import getLanguages from './getLanguages';

const CustomError = require('../custom-error');
const dotCMSApi = require('../../config/dotcmsApi');
const { LANG_COOKIE_NAME } = require('./constants');
const { loggerLog } = require('../logger');
const { printError } = require('../../cli/print');

async function getNav(depth, location = '/') {
    if (process.env.NODE_ENV !== 'production') {
        loggerLog('DOTCMS NAV');
    }

    const nav = await dotCMSApi.nav.get(depth, location).then(({ children }) => children);
    const finalNav = [
        {
            href: '/index',
            title: 'Home',
            children: [],
            folder: false,
            hash: 'home'
        },
        ...nav
    ];
    return finalNav;
}

function emitRemoteRenderEdit(url) {
    console.log('emitting event');
    dotCMSApi.event.emit({
        name: 'remote-render-edit',
        data: { pathname: url }
    });
}

function getCookie(cookies, name) {
    if (cookies) {
        const match = cookies.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : '';
    }

    return '';
}

function setCookie(name, value) {
    document.cookie = `${name}=${value}`;
}

const getToken = ({ user, password, expirationDays, host }) => {
    return dotCMSApi.auth
        .getToken({ user, password, expirationDays, host })
        .then((res) => res)
        .catch((err) => {
            if (err.status === 400 || err.status === 401) {
                console.log('\n');
                printError(err.message);
                return;
            }
            throw err;
        });
};

/*
 * Determines if the path ends with /index but only when the / is preceded by a word
 *
 * This is needed to create the right paths for Next.js getStaticPaths' paths array
 * `/destinations/index` becomes `/destinations`
 *
 * @param {string} str - the path (e.g /destinations/index)
 */
const pathEndsWithIndex = (str) => {
    const r = /(?<=\w)(\/index)/;
    return r.test(str);
};

const getParamsObjectForPath = (pathArray, url) => {
    return {
        params: {
            slug: pathEndsWithIndex(url)
                ? pathArray.splice(0, pathArray.indexOf('index'))
                : pathArray
        }
    };
};

const getPathsArray = (pageList) => {
    const paths = pageList.reduce((acc, url) => {
        let urlArr = url.split('/').filter(Boolean);
        acc = [...acc, getParamsObjectForPath(urlArr, url)];
        return acc;
    }, []);

    // Due to how optional catch-all works, we need to pass an empty slug to generate index.html
    return paths.concat({ params: { slug: [''] } });
};

const getTagsListForCategory = async (category) => {
    const data = {
        query: {
            query_string: {
                query: `+contentType:product +categories:${category}`
            }
        },
        aggs: {
            tag: {
                terms: {
                    field: 'tags',
                    size: 100
                }
            }
        },
        size: 0
    };

    const options = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const results = await fetch(`${process.env.NEXT_PUBLIC_DOTCMS_HOST}/api/es/search`, options);
    
    const {
        esresponse: [
            {
                aggregations: {
                    'sterms#tag': { buckets }
                }
            }
        ]
    } = await results.json();

    return buckets;    
};

const getLanguagesProps = async (selectedLanguage = '') => {
    // Fetch list of languages supported in the DotCMS instance so we can inject the data into the static pages
    // and map to a clean array of ISO compatible lang codes.
    const languages = await getLanguages();
    
    // This will be coming from the API
    const __DEFAULT_LANGUAGE__ = "en"

    // Returns either true or false if `selectedLanguage` in a valid language from our languages array
    let hasLanguages = languages
        .map((language) => language.languageCode)
        .filter((language) => language !== __DEFAULT_LANGUAGE__)
        .includes(selectedLanguage);

    // If the hasLanguages predicate returns true find the language in the languages array and pass it in `getPage` call
    const languageId = hasLanguages
        ? languages.find((lang) => lang.languageCode === selectedLanguage).id
        : '1';

    return new Promise((resolve) => {
        let results = {
            hasLanguages,
            languageId,
            languages,
            defaultLanguage: __DEFAULT_LANGUAGE__
        };

        resolve(
            hasLanguages
                ? {
                    ...results,
                    selectedLanguage
                }
                : results
        );

    });
};

module.exports = {
    CustomError,
    getCookie,
    setCookie,
    LANG_COOKIE_NAME,
    getPage,
    getNav,
    emitRemoteRenderEdit,
    getToken,
    getTagsListForCategory,
    getPathsArray,
    getLanguages,
    getLanguagesProps
};

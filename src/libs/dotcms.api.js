const { login, isLogin, logout } = require('./dotcms.auth');
const { getCurrentSite } = require('./dotcms.sites');
const { esSearch } = require('./dotcms.esSearch');
const { getId, getCode } = require('./dotcms.languages');
const fetch = require('node-fetch');

const getUrl = async (langCode, pathname) => {
    const langId = await getId(langCode);
    const host = process.env.NODE_ENV !== 'development' ? process.env.REACT_APP_DOTCMS_HOST : '';
    const url = `${host}/api/v1/page/json/${pathname.slice(1)}`;
    return langId ? `${url}?language_id=${langId}` : url;
};

const translate = (page) => {
    if (page.layout) {
        page.layout.body.rows.forEach((row) => {
            row.columns.forEach((col) => {
                col.containers = col.containers.map((container) => {
                    return {
                        ...container,
                        ...page.containers[container.identifier].container,
                        acceptTypes: page.containers[container.identifier].containerStructures
                            .map((structure) => structure.contentTypeVar)
                            .join(','),
                        contentlets:
                            page.containers[container.identifier].contentlets[
                                `uuid-${container.uuid}`
                            ]
                    };
                });
            });
        });

        if (
            page.layout.sidebar &&
            page.layout.sidebar.containers &&
            page.layout.sidebar.containers.length
        ) {
            page.layout.sidebar.containers = page.layout.sidebar.containers.map((container) => {
                const contentlets =
                    page.containers[container.identifier].contentlets[`uuid-${container.uuid}`];
                return {
                    ...container,
                    contentlets
                };
            });
        }
    }

    return page;
};

const request = ({ url, method, body }) => {
    return fetch(url, {
        method: method || 'GET',
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
            'Content-type': 'application/json'
        },
        body: body
    });
};

const get = async ({ langCode, pathname }) => {
    const url = await getUrl(langCode, pathname);

    return request({ url })
        .then((data) => {
            if (data.ok) {
                return data.json();
            } else {
                return data;
            }
        })
        .then((data) => {
            if (data.entity) {
                return data.entity.layout ? translate(data.entity) : {};
            }
            throw new Error(data.status);
        })
        .catch((err) => {
            return {
                error: err.message
            };
        });
};

const emitCustomEvent = (eventName, eventData) => {
    const customEvent = window.top.document.createEvent('CustomEvent');
    customEvent.initCustomEvent('ng-event', false, false, {
        name: eventName,
        data: eventData
    });
    window.top.document.dispatchEvent(customEvent);
};

const getConfiguration = () => {
    return request({
        url: `${process.env.REACT_APP_DOTCMS_HOST}/api/v1/configuration`
    })
        .then((response) => response.json())
        .then((data) => {
            return data.entity;
        });
};

const getWidgetHtml = (identifier) => {
    return request({
        url: `${process.env.REACT_APP_DOTCMS_HOST}/api/widget/id/` + identifier
    }).then((response) => response.text());
};

export default {
    auth: {
        login,
        logout,
        isLogin
    },
    languages: {
        getId,
        getCode,
    },
    page: {
        emitCustomEvent,
        get,
        getWidgetHtml,
        translate
    },
    sites: {
        getCurrentSite
    },
    esSearch,
    getConfiguration,
    request
};

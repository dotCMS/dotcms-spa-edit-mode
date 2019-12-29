import App from 'next/app';
import React from 'react';
import dotcms from '../utils/dotcms';
import Router from 'next/router';
import NProgress from 'nprogress';
import GlobalStyles from '../components/GlobalStyles';

import { setCookie, getCookie, LANG_COOKIE_NAME } from '../utils/dotcms/utilities';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export const PageContext = React.createContext({
    isEditMode: false,
    nav: [],
    language: {}
});

function DotCMSStatus({ status }) {
    return (
        <>
            <style jsx>
                {`
                    p {
                        background-color: var(--dark);
                        color: var(--white);
                        font-size: 0.75em;
                        padding: 0.5rem 1rem;
                        position: fixed;
                        right: 0.5rem;
                        top: 0.5rem;
                    }
                `}
            </style>
            {status ? <p>{status}</p> : null}
        </>
    );
}

class MyApp extends App {
    static async getInitialProps(appContext) {
        const appProps = await App.getInitialProps(appContext);
        let nav = [];
        try {
            nav = await dotcms.getNav();
        } catch {
            nav = [];
        }

        const cookie = process.browser ? document.cookie : appContext.ctx.req.headers.cookie;
        const language = getCookie(cookie, LANG_COOKIE_NAME);
        return { ...appProps, nav, language };
    }

    setLanguage(value) {
        setCookie(LANG_COOKIE_NAME, value);
        Router.reload();
    }

    render() {
        const {
            Component,
            router: {
                query: { dotcmsStatus }
            },
            pageProps,
            nav,
            language
        } = this.props;

        const { error } = pageProps;
        const isEditMode = pageProps.pageProps ? pageProps.viewAs.mode === 'EDIT_MODE' : false;

        const FinalComponentToRender = () =>
            error ? <Component {...error} /> : <Component {...pageProps}></Component>;

        return (
            <PageContext.Provider
                value={{
                    isEditMode,
                    nav,
                    language: {
                        current: language,
                        set: this.setLanguage.bind(this)
                    }
                }}
            >
                <GlobalStyles />
                <DotCMSStatus status={dotcmsStatus} />
                <FinalComponentToRender />
            </PageContext.Provider>
        );
    }
}

export default MyApp;

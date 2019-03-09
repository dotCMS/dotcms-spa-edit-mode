import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Page from './Page';
import { Layout } from './Components/Layout';
import CantRender from './Components/CantRender';
import NewsDetailPage from './Pages/NewsDetail';
import PageContext from './PageContext';

import transformPage from './utils/transformPage';
import dotcmsApi from './dotcmsApi';

import getLangCode from './utils/getLangCode';

const ERROR_UNAUTHORIZED_USER = 400;

const NoAuth = () => (
    <CantRender title="Invalid Authorization Token" color="warning">
        <p>
            Please set one in the <code>.env</code> file or use <code>npm run auth:start</code>
        </p>
    </CantRender>
);

class PageFetchWrapper extends Component {
    constructor() {
        super();
        this.state = {
            error: '',
            layout: {},
            mode: {},
            location: {},
            title: ''
        };
    }

    doesUrlChange(nextProps, prevState) {
        return (
            prevState.location.pathname &&
            nextProps.location.pathname !== prevState.location.pathname
        );
    }

    setPage(location) {
        const isEditModeFromDotCMS = this.props.payload && this.props.payload.page && this.props.payload.page.remoteRendered;

        if (isEditModeFromDotCMS) {
            dotcmsApi.event.emit({
                name: 'remote-render-edit',
                data: { pathname: location.pathname }
            });
            return;
        }

        dotcmsApi.page
            .get({
                language: getLangCode(location.search),
                url: location.pathname
            })
            .then((pageAsset) => {
                const { layout, error, viewAs, page } = transformPage(pageAsset);

                this.setState({
                    error: error,
                    layout,
                    mode: viewAs ? viewAs.mode : '',
                    location,
                    title: page ? page.title : ''
                });
            })
            .catch((err) => {
                this.setState({
                    ...this.state,
                    error: err.status
                });
            });
    }

    shouldComponentUpdate(nextProps, prevState) {
        if (this.doesUrlChange(nextProps, prevState)) {
            this.setPage(nextProps.location);
        }

        return true;
    }

    componentDidMount() {
        const { layout, viewAs, page, site } = this.props.payload || {};

        if (this.props.payload) {
            this.setState({
                ...this.state,
                layout,
                page,
                location: this.props.location,
                mode: viewAs ? viewAs.mode : '',
                site,
                title: page ? page.title : ''
            });
        } else {
            this.setPage(this.props.location);
        }
    }

    render() {
        let layout = this.props.payload ? this.props.payload.layout : this.state.layout;

        return (
            <PageContext.Provider
                value={{
                    mode: this.state.mode,
                    page: this.state.page,
                    site: this.state.site
                }}
            >
                <Layout {...layout} title={this.state.title}>
                    {this.state.error === ERROR_UNAUTHORIZED_USER ? (
                        <NoAuth />
                    ) : (
                        <Page {...layout} />
                    )}
                </Layout>
            </PageContext.Provider>
        );
    }
}

const App = (page) => {
    return (
        <Switch>
            <Route path="/news-events/news/:slug" component={NewsDetailPage} />
            <Route render={(props) => <PageFetchWrapper {...props} {...page} />} />
        </Switch>
    );
};
export default App;

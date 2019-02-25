import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import Page from './Page';
import { Layout } from './Components/Layout';
import CantRender from './Components/CantRender';
import NewsDetailPage from './Pages/NewsDetail';

import DotCMSApi from './libs/dotcms.api';
import PageContext from './PageContext';

const ERROR_UNAUTHORIZED_USER = '400';

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
            error: null,
            layout: null,
            mode: null,
            location: null,
            title: ''
        };
    }

    doesUrlChange(nextProps, prevState) {
        return prevState.location.pathname && nextProps.location.pathname !== prevState.location.pathname;
    }

    setPage(location) {
        const isEditModeFromDotCMS = this.props.page && this.props.page.remoteRendered;

        if (isEditModeFromDotCMS) {
            DotCMSApi.page.emitCustomEvent('remote-render-edit', { pathname: location.pathname });
            return;
        }

        DotCMSApi.page
            .get({
                langCode: DotCMSApi.languages.getCode(location.search),
                pathname: location.pathname
            })
            .then(({ layout, error, viewAs, page }) => {
                this.setState({
                    error: error,
                    layout,
                    mode: viewAs ? viewAs.mode : '',
                    location,
                    title: page ? page.title : ''
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
        const { layout, viewAs, page } = this.props;
        if (layout) {
            this.setState({
                ...this.state,
                layout,
                page,
                location: this.props.location,
                mode: viewAs ? viewAs.mode : '',
                site: this.props.site,
                title: page ? page.title : ''
            });
        } else {
            this.setPage(this.props.location);
        }
    }

    render() {
        const { layout } = this.state || this.props;
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

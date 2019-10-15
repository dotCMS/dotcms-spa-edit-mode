import React from 'react';
import Page from '../Page';
import PageContext from '../PageContext';
import { Layout } from '../Components/Layout';

const Index = ({pageState}) => {
    return (
        <PageContext.Provider
            value={{
                mode: pageState.mode,
                page: pageState.page,
                site: pageState.site
            }}
        >
            <Layout {...pageState.layout.body} title={pageState.title}>
                <Page {...{body: pageState.layout.body}} />
            </Layout>
        </PageContext.Provider>
    );
};

Index.getInitialProps = async function({req, query: {  pageState }}) {
    return {
        pageState
    };
};

export default Index;
    
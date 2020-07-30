import React from 'react';
import { getComponent } from '../../utilities/dotcms/mapContentTypes';
import PageContext from '../../contexts/PageContext';
import Layout from '../layout/Layout';
import LayoutGrid from './LayoutGrid';

const DotCMSPage = ({ pageRender, nav, isEditMode, languageProps }) => {
    let DetailPage;

    if (pageRender?.urlContentMap) {
        const { urlContentMap } = pageRender;
        DetailPage = getComponent(`${urlContentMap.contentType}Detail`);
    }

    const contextValue = {
        isEditMode,
        nav,
        pageRender,
        languageProps
    };

    // When the page is generating during request (for example `/store/category-tag` pages) we don't want to show anything.
    if (typeof pageRender === 'undefined') return null;

    return (
        <PageContext.Provider value={contextValue}>
            {pageRender?.layout ? (
                <Layout>{DetailPage ? <DetailPage /> : <LayoutGrid />}</Layout>
            ) : (
                <h1>No layout in this page</h1>
            )}
        </PageContext.Provider>
    );
};

export default DotCMSPage;

import React from 'react';
import { getComponent } from '../content-types/mapContentTypes';
import PageContext from '../../contexts/PageContext';
import Layout from '../layout/Layout';
import LayoutGrid from './LayoutGrid';
import { loggerPageRender } from '../../utilities/logger'

const DotCMSPage = ({ pageRender, isEditMode, nav }) => {
    // if(typeof(window) !== "undefined") loggerPageRender(pageRender);
    if (pageRender?.urlContentMap) {
        const { urlContentMap } = pageRender;
        var SinglePage = getComponent(`${urlContentMap.contentType}Single`);
    }

    const contextValue = {
        isEditMode,
        nav,
        language: {
            current: '1', // needs to make this dynamic, check _app.js
            set: () => {}
        },
        pageRender
    };

    return (
        <PageContext.Provider value={contextValue}>
            {pageRender?.layout ? (
                <Layout>{SinglePage ? <SinglePage /> : <LayoutGrid />}</Layout>
            ) : (
                <h1>No layout in this page</h1>
            )}
        </PageContext.Provider>
    );
};

export default DotCMSPage;

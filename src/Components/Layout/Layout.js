import React from 'react';
import { Container as BootstrapContainer } from 'reactstrap';

import Header from './Header';
import Footer from './Footer';
import LayoutWithSidebar from './LayoutWithSidebar';

import './Layout.css';

export const Layout = (props) => {
    const includeHeader = props.header !== false;
    const includeFooter = props.footer !== false;

    const contentClass = `layout__content${!includeHeader ? ' layout__content--no-header' : ''}`;

    const { sidebar } = props;

    return (
        <>
            
            <BootstrapContainer className={contentClass}>
                {sidebar && !!sidebar.location ? (
                    <LayoutWithSidebar sidebar={sidebar}>{props.children}</LayoutWithSidebar>
                ) : (
                    props.children
                )}
            </BootstrapContainer>
            {includeFooter ? <Footer /> : null}
        </>
    );
};


//{includeHeader ? <Header title={props.title} /> : null}
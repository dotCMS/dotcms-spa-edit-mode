import React from 'react';

const DotContelet = (props) => {
    return (
        <div
            data-dot-object="contentlet"
            data-dot-inode={props.inode}
            data-dot-identifier={props.identifier}
            data-dot-type={props.contentType}
            data-dot-basetype={props.baseType}
            data-dot-lang={props.dotLang}
            data-dot-title={props.title}
            data-dot-can-edit={props.dotCanEdit || true}
            data-dot-content-type-id={props.dotContentTypeId}
            // data-dot-has-page-lang-version={props.dotHasPageLangVersion}
            data-dot-has-page-lang-version="true"
        >
            {/* This extra <div> is to prevent error in edit mode with the Loadable component */}
            <div>{props.children}</div>
        </div>
    );
};

export default DotContelet;

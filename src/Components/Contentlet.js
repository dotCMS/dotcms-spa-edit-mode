import React, { Component } from 'react';
import Loadable from 'react-loadable';

import { Spinner } from 'reactstrap';
import DotContentlet from '../libs/DotContentlet';
import SimpleWidget from './DotCMS/SimpleWidget';
import PageContext from '../PageContext';
import CantRender from './CantRender';

const Loading = (props) => {
    const divStyle = {
        textAlign: 'center',
        padding: '2rem'
    };
    return props.error ? (
        props.contentlet.baseType === 'WIDGET' ? (
            <SimpleWidget identifier={props.contentlet.identifier} />
        ) : (
            <CantRender color="warning" title={props.contentlet.title}>
                <p>{props.error.message}</p>
            </CantRender>
        )
    ) : (
        <div style={divStyle}>
            <Spinner color="primary" />
        </div>
    );
};

export default class Contentlet extends Component {
    static contextType = PageContext;

    render() {
        const showLoadableContentletWarning = this.context.mode !== 'ADMIN_MODE';
        const isEditMode = this.context.mode === 'EDIT_MODE';
        //console.log(this.props.data.baseType)
        const Component = Loadable({
            loader: () => import(`./DotCMS/${this.props.data.contentType}`),
            loading: (props) =>
                showLoadableContentletWarning ? (
                    <Loading contentlet={this.props.data} {...props} />
                ) : null
        });
        const isEditModeFromDotCMS = isEditMode && this.context.page && this.context.page.remoteRendered;

        return isEditModeFromDotCMS ? (
            <DotContentlet {...this.props.data}>
                <Component {...this.props.data} />
            </DotContentlet>
        ) : (
            <Component {...this.props.data} />
        );
    }
}

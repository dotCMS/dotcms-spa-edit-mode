import React, { Component } from 'react';
import DotCMSApi from '../../libs/dotcms.api';

export default class SimpleWidget extends Component {
    state = {
        widgetCode: ''
    };

    componentDidMount() {
        DotCMSApi.page.getWidgetHtml(this.props.identifier).then((content) => {
            this.setState({
                ...this.state,
                widgetCode: content
            });
        });
    }

    render() {
        return (
            <div className="widget">
                <div dangerouslySetInnerHTML={{ __html: this.state.widgetCode }} />
                <h6>{this.props.widgetTitle}</h6>
            </div>
        );
    }
}

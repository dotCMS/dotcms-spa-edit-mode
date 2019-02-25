import React from 'react';
import DotCMSApi from '../libs/dotcms.api';
import { Layout } from '../Components/Layout';
import NewsDetail from '../Components/News/NewsDetail';
import './NewsDetail.css';

class NewsDetailPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = props.location.state ? props.location.state.news : null;
    }

    async getNews() {
        DotCMSApi.esSearch('news', {
            detailedSearchQuery: `+News.urlTitle:${this.props.match.params.slug.split('?')[0]}`,
            languageId: await DotCMSApi.languages.getId(window.location.search)
        })
            .then((response) => response.json())
            .then((newsData) => {
                this.setState((state) => newsData.contentlets[0]);
            });
    }

    componentDidMount() {
        if (!this.state) {
            this.getNews();
        }
    }

    render() {
        return (
            <Layout
                {...{ header: true, footer: true }}
                title={this.state && this.state.news ? this.state.news.title : ''}
            >
                <NewsDetail {...this.state} />
            </Layout>
        );
    }
}

export default NewsDetailPage;

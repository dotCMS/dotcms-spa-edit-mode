import React, { Component } from 'react';
import PageContext from '../../PageContext';
import PropTypes from 'prop-types';
import { Card, CardImg, CardTitle, CardText, CardSubtitle, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import DateFormat from '../Shared/DateFormat';

import IMAGE_PLACEHOLDER from '../../theme/images/placeholder.jpg';

class ItemLink extends Component {
    static contextType = PageContext;
    languagePrefix = '';
    render() {
        this.languagePrefix =
            this.context.language && this.context.language.code
                ? `/${this.context.language.code}`
                : '';
        return (
            <Link
                to={{
                    pathname: this.languagePrefix + this.props.pathname,
                    state: this.props.state
                }}
            >
                {this.props.children}
            </Link>
        );
    }
}

const NewsListItem = ({ news, fieldsToDisplay }) => {
    const displayedFields = fieldsToDisplay.split(',');
    return (
        <Card>
            {displayedFields.includes('image') ? (
                <ItemLink pathname={`/news-events/news/${news.urlTitle}`} state={news}>
                    <CardImg
                        top
                        width="100%"
                        src={news.image || IMAGE_PLACEHOLDER}
                        alt={news.urlTitle}
                    />
                </ItemLink>
            ) : (
                ''
            )}
            <CardBody>
                {displayedFields.includes('title') ? (
                    <CardTitle>
                        <ItemLink pathname={`/news-events/news/${news.urlTitle}`} state={news}>
                            {news.title}
                        </ItemLink>
                    </CardTitle>
                ) : (
                    ''
                )}
                {displayedFields.includes('publishDate') ? (
                    <CardSubtitle>
                        <DateFormat dateString={news.sysPublishDate} />
                    </CardSubtitle>
                ) : (
                    ''
                )}
                {displayedFields.includes('summary') ? <CardText>{news.lead}</CardText> : ''}
            </CardBody>
        </Card>
    );
};

NewsListItem.propTypes = {
    fieldsToDisplay: PropTypes.string,
    news: PropTypes.shape({
        identifier: PropTypes.string.isRequired,
        image: PropTypes.string,
        sysPublishDate: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        lead: PropTypes.string.isRequired
    }).isRequired
};

NewsListItem.defaultProps = {
    fieldsToDisplay: ''
};

export default NewsListItem;

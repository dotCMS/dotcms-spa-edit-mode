import React from 'react';
import PropTypes from 'prop-types';
import NewsListItem from './NewsListItem';

import './NewsList.css';

const NewsList = ({ news, fieldsToDisplay }) => {
    return (
        <div className="news-list">
            {news.map((item, index) => (
                <NewsListItem
                    news={item}
                    key={index}
                    fieldsToDisplay={fieldsToDisplay}
                />
            ))}
        </div>
    );
};

NewsList.propTypes = {
    fieldsToDisplay: PropTypes.string.isRequired,
    news: PropTypes.arrayOf(
        PropTypes.shape({
            identifier: PropTypes.string.isRequired,
            image: PropTypes.string,
            sysPublishDate: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            lead: PropTypes.string.isRequired
        })
    ).isRequired
};

NewsList.defaultProps = {
    fieldsToDisplay: '',
};

export default NewsList;

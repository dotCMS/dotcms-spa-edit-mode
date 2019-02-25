import React from 'react';
import { shallow } from 'enzyme';
import wait from 'waait';
import DotCMSApi from '../../libs/dotcms.api';
import Pagination from '../../Components/Shared/Pagination';
import NewsWidgets from '../../Components/DotCMS/NewsWidgets';

describe('<NewsWidgets />', () => {
    let wrapper;
    let newsPageData;
    let newsSearchData;

    beforeEach(async () => {
        window.history.pushState({}, 'Test Title', '/test.html?lang=en');

        newsSearchData = {
            contentlets: [
                {
                    title: 'news1',
                    identifier: '1',
                    sysPublishDate: 'today',
                    lead: 'test'
                },
                {
                    title: 'news2',
                    identifier: '2',
                    sysPublishDate: 'today',
                    lead: 'test'
                },
                {
                    title: 'news3',
                    identifier: '3',
                    sysPublishDate: 'today',
                    lead: 'test'
                }
            ],
            esresponse: [
                {
                    hits: {
                        total: 25
                    }
                }
            ]
        };

        DotCMSApi.esSearch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve({
                    status: 200,
                    json: () =>
                        new Promise((resolve, reject) => {
                            resolve(newsSearchData);
                        })
                });
            });
        });

        DotCMSApi.languages.getId = jest.fn().mockImplementation(() => {
            return '1';
        });

        newsPageData = {
            fieldsToDisplay: '',
            languageId: '1',
            sortResultsBy: 'title',
            sortOrder1: 'asc',
            pagination: true,
            itemsPerPage: 30,
            numberOfResults: 9,
        };
    });

    it('should render NewsList & Pagination components', async () => {
        wrapper = shallow(
            <NewsWidgets {...newsPageData} fieldsToDisplay={''} />
        );
        await wait();

        const fetchParams = {
            sortResultsBy: 'title_dotraw',
            sortOrder1: newsPageData.sortOrder1,
            itemsPerPage: newsPageData.pagination
                ? newsPageData.itemsPerPage
                : newsPageData.numberOfResults,
                languageId: newsPageData.languageId,
            pagination: newsPageData.pagination,
            numberOfResults: newsPageData.numberOfResults,
            offset: 0,
            totalItems: 0
        };

        expect(DotCMSApi.languages.getId).toHaveBeenCalledWith('?lang=en');
        expect(DotCMSApi.esSearch).toHaveBeenCalledWith('news', fetchParams);
        expect(wrapper.find('NoResults').exists()).toBeFalsy();

        const newsList = wrapper.find('NewsList');
        expect(newsList.props()).toEqual({
            fieldsToDisplay: '',
            news: newsSearchData.contentlets
        });

        const pagination = wrapper.find(Pagination);
        expect(pagination.prop('pageSize')).toEqual(fetchParams.itemsPerPage);
        expect(pagination.prop('totalItems')).toEqual(
            newsSearchData.esresponse[0].hits.total
        );
    });

    it('should render NewsList & NO Pagination components', async () => {
        newsPageData = { ...newsPageData, pagination: false };
        wrapper = shallow(
            <NewsWidgets {...newsPageData} fieldsToDisplay={''} />
        );
        await wait();

        expect(wrapper.find('NoResults').exists()).toBeFalsy();

        const newsList = wrapper.find('NewsList');
        expect(newsList.props()).toEqual({
            fieldsToDisplay: '',
            news: newsSearchData.contentlets
        });

        expect(wrapper.find('Pagination').exists()).toBeFalsy();
    });

    it('should render NoResults component', async () => {
        newsSearchData = {
            contentlets: [],
            esresponse: [
                {
                    hits: {
                        total: 0
                    }
                }
            ]
        };

        DotCMSApi.esSearch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve({
                    status: 200,
                    json: () =>
                        new Promise((resolve, reject) => {
                            resolve(newsSearchData);
                        })
                });
            });
        });

        wrapper = shallow(<NewsWidgets {...newsPageData} />);
        await wait();
        expect(wrapper.find('NoResults').exists()).toBeTruthy();
        expect(wrapper.find('NewsList').exists()).toBeFalsy();
        expect(wrapper.find('Pagination').exists()).toBeFalsy();
    });
});

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import NewsDetailPage from '../../Pages/NewsDetail';
import { newsMock } from '../../TestUtils/news';
import wait from 'waait';
import dotCMSApi from '../../dotcmsApi';

describe('<NewsDetailPage />', () => {
    let newsSearchData;

    beforeEach(() => {
        window.history.pushState({}, 'Test Title', '/test.html?lang=en');
        newsSearchData = {
            contentlets: [
                {
                    title: 'news1',
                    identifier: '1',
                    sysPublishDate: 'today',
                    lead: 'test'
                }
            ],
            esresponse: [
                {
                    hits: {
                        total: 1
                    }
                }
            ]
        };

        dotCMSApi.esSearch.search = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve(newsSearchData);
            });
        });

        dotCMSApi.language.getId = jest.fn().mockImplementation(() => {
            return '1';
        });
    });

    it('renders NewsDetailPage correctly with NO Api fetch', () => {
        const wrapper = shallow(
            <NewsDetailPage
                location={{ state: { news: newsMock } }}
                match={{ params: { slug: '' }, path: '', url: '' }}
            />
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        expect(dotCMSApi.esSearch.search).not.toHaveBeenCalled();
    });

    it('renders NewsDetailPage correctly with Api fetch', async () => {
        const wrapper = shallow(
            <NewsDetailPage
                location={{ state: {} }}
                match={{
                    params: { slug: newsMock.urlTitle },
                    path: '',
                    url: ''
                }}
            />
        );
        expect(toJSON(wrapper)).toMatchSnapshot();
        await wait();
        expect(dotCMSApi.language.getId).toHaveBeenCalledWith('en');
        expect(dotCMSApi.esSearch.search).toHaveBeenCalledWith({
            contentType: 'news', queryParams: {
                detailedSearchQuery: `+News.urlTitle:${newsMock.urlTitle}`,
                languageId: '1'
            }
        });
    });
});

import React from 'react';
import { shallow } from 'enzyme';
import wait from 'waait';
import BannerCarouselWidgets from '../../Components/DotCMS/BannerCarouselWidgets';

import dotCMSApi from '../../dotcmsApi';

describe('<BannerCarouselWidgets />', () => {
    let wrapper;
    let bannersPageData;
    let bannerResponseData;

    const formatBannersData = (banners) => {
        return banners.map(banner => {
            return {
                src: banner.imageVersion,
                altText: banner.title,
                title: banner.title,
                caption: banner.caption1
            };
        });
    }

    const mockEsSearch = (response) => {
        dotCMSApi.esSearch.search = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve({
                    status: 200,
                    json: () =>
                        new Promise((resolve, reject) => {
                            resolve(response);
                        })
                });
            });
        });
    }

    beforeEach(async () => {
        bannerResponseData = {
            contentlets: [
                {
                    title: 'banner1',
                    imageVersion: 'url1',
                    caption1: 'caption1'
                },
                {
                    title: 'banner2',
                    imageVersion: 'url2',
                    caption1: 'caption2'
                },
                {
                    title: 'banner3',
                    imageVersion: 'url3',
                    caption1: 'caption3'
                }
            ],
            esresponse: [
                {
                    hits: {
                        total: 3
                    }
                }
            ]
        };

        mockEsSearch(bannerResponseData);

        bannersPageData = {
            fieldsToDisplay: 'title, caption1',
            languageId: '1',
            sortResultsBy: 'title',
            sortOrder1: 'asc',
            numberOfResults: 3,
        };
    });

    it('should render BannerCarousel component', async () => {
        wrapper = shallow(
            <BannerCarouselWidgets {...bannersPageData} />
        );
        await wait();

        const fetchParams = {
            sortResultsBy: 'title_dotraw',
            sortOrder1: bannersPageData.sortOrder1,
            languageId: bannersPageData.languageId,
            numberOfResults: bannersPageData.numberOfResults,
        };

        expect(dotCMSApi.esSearch.search).toHaveBeenCalledWith({contentType: 'banner', queryParams: fetchParams});
        expect(wrapper.find('NoResults').exists()).toBeFalsy();

        const bannerFormatData = formatBannersData(bannerResponseData.contentlets);
        const bannerCarousel = wrapper.find('BannerCarousel');
        expect(bannerCarousel.props()).toEqual({
            fieldsToDisplay: bannersPageData.fieldsToDisplay,
            items: bannerFormatData
        });
    });

    it('should render NoResults component', async () => {
        bannerResponseData = {
            contentlets: [],
            esresponse: [
                {
                    hits: {
                        total: 0
                    }
                }
            ]
        };

        mockEsSearch(bannerResponseData);

        wrapper = shallow(<BannerCarouselWidgets data={bannersPageData} />);
        await wait();
        expect(wrapper.find('NoResults').exists()).toBeTruthy();
        expect(wrapper.find('BannerCarousel').exists()).toBeFalsy();
    });
});

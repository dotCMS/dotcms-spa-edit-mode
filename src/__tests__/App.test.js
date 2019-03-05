import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { StaticRouter } from 'react-router';
import wait from 'waait';
import PAGE_MOCK_FORMATTED from '../TestUtils/data';
import dotCMSApi from '../dotcmsApi';
import { mount } from 'enzyme';

describe('<App />', () => {
    beforeEach(() => {
        dotCMSApi.page.get = jest.fn().mockImplementation(
            () =>
                new Promise((resolve, reject) => {
                    resolve({ ...PAGE_MOCK_FORMATTED });
                })
        );

        dotCMSApi.event.emit = jest.fn().mockImplementation();

        dotCMSApi.widget.getHtml = () => new Promise((resolve, reject) => {
            resolve('');
        });

        dotCMSApi.nav.get = () => new Promise((resolve, reject) => {
            resolve({children: []});
        });
    });

    it('should render with page data (SSR)', () => {
        const context = {};
        const div = document.createElement('div');
        ReactDOM.render(
            <StaticRouter location="someLocation" context={context}>
                <App payload={PAGE_MOCK_FORMATTED} />
            </StaticRouter>,
            div
        );

        expect(dotCMSApi.page.get).not.toHaveBeenCalled();
        expect(dotCMSApi.event.emit).not.toHaveBeenCalled();
    });

    it('should render client side with page', async () => {
        const context = {};
        const location = { pathname: 'someLocation', search: '?lang=en' };
        const div = document.createElement('div');
        ReactDOM.render(
            <StaticRouter location={location} context={context}>
                <App />
            </StaticRouter>,
            div
        );
        await wait();
        expect(dotCMSApi.page.get).toHaveBeenCalledWith({
            language: 'en',
            url: 'someLocation'
        });
        expect(dotCMSApi.event.emit).not.toHaveBeenCalled();
    });

    it('should emit remote render edit event', () => {
        const context = {};
        const payload = {
            ...PAGE_MOCK_FORMATTED,
            page: {
                ...PAGE_MOCK_FORMATTED.page,
                remoteRendered: true
            }
        };
        const wrapper = mount(<StaticRouter location="someLocation" context={context}>
            <App payload={payload} />
        </StaticRouter>);

        wrapper.setProps({
            location: {
                pathname: '',
                search: ''
            },
            payload: payload
        })


        expect(dotCMSApi.event.emit).toHaveBeenCalled();
    })
});

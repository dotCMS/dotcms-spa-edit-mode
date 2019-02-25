import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import DotCMSApi from '../libs/dotcms.api';
import { StaticRouter } from 'react-router';
import wait from 'waait';

import PAGE_MOCK_FORMATTED from '../TestUtils/data';

describe('<App />', () => {
    beforeEach(() => {
        DotCMSApi.languages.getCode = jest.fn().mockImplementation(() => {
            return 'en';
        });

        DotCMSApi.page.get = jest.fn().mockImplementation(
            () =>
                new Promise((resolve, reject) => {
                    resolve({ ...PAGE_MOCK_FORMATTED });
                })
        );
    });

    it('renders with page data (SSR)', () => {
        const context = {};
        const div = document.createElement('div');
        ReactDOM.render(
            <StaticRouter location="someLocation" context={context}>
                <App {...PAGE_MOCK_FORMATTED} />
            </StaticRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders Client Side with page', async () => {
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
        expect(DotCMSApi.languages.getCode).toHaveBeenCalledWith('?lang=en');
        expect(DotCMSApi.page.get).toHaveBeenCalledWith({
            langCode: 'en',
            pathname: 'someLocation'
        });
        ReactDOM.unmountComponentAtNode(div);
    });
});

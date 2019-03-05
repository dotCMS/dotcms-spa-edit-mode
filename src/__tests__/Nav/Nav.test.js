import React from 'react';
import { shallow } from 'enzyme';
import wait from 'waait';
import Nav from '../../Components/Nav/Nav';
import toJSON from 'enzyme-to-json';
import { NavResponse } from '../../TestUtils/navResponse';
import dotCMSApi from '../../dotcmsApi';

describe('<Nav />', () => {
    let wrapper;

    beforeEach(async () => {
        dotCMSApi.nav.get = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve(NavResponse.entity);
            });
        });

        wrapper = await shallow(<Nav />);
    });

    it('should call api correctly', () => {
        expect(dotCMSApi.nav.get).toHaveBeenCalledWith('3');
    });

    it('renders nav correctly', async () => {
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('should expand menu', async () => {
        expect(wrapper.find('Collapse').props().isOpen).toBe(false);

        wrapper.find('NavbarToggler').simulate('click');
        await wrapper.update();
        await wait();

        expect(wrapper.find('Collapse').props().isOpen).toBe(true);
    });
});

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import ItemLink from '../../Components/Shared/ItemLink';

describe('<ItemLink />', () => {
    it('renders and matches snapshot', () => {
        window.history.pushState({}, 'Test Title', '/test.html?lang=en');
        const props = {
            className: 'testCss',
            pathname: 'testPath',
            state: {
                id: 'testId',
                name: 'testName'
            }
        };
        const wrapper = shallow(<ItemLink {...props} />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});

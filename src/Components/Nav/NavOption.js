import React from 'react';
import PropTypes from 'prop-types';
import { NavItem, NavLink } from 'reactstrap';
import ItemLink from '../Shared/ItemLink';

const NavOption = ({item}) => {
    return (
        <NavItem key={item.folder}>
            <NavLink
                className="nav-option"
                tag={ItemLink}
                active={item.href === window.location.pathname}
                pathname={item.href}
            >
                {item.title}
            </NavLink>
        </NavItem>
    );
};

NavOption.propTypes = {
    item: PropTypes.shape({
        folder: PropTypes.string,
        href: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired
};

export default NavOption;

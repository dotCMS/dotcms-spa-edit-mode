import React from 'react';
import PropTypes from 'prop-types';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import ItemLink from '../Shared/ItemLink';

const NavDropDown = ({ options }) => {
    return (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret className="nav-option">
                {options.title}
            </DropdownToggle>
            <DropdownMenu className="nav-dropdown" right>
                {options.children.map((subItem, index) => {
                    return (
                        <DropdownItem
                            tag={ItemLink}
                            pathname={subItem.href}
                            active={subItem.href === window.location.pathname}
                            key={index}
                        >
                            {subItem.title}
                        </DropdownItem>
                    );
                })}
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

NavDropDown.propTypes = {
    options: PropTypes.shape({
        title: PropTypes.string.isRequired,
        children: PropTypes.arrayOf(
            PropTypes.shape({
                folder: PropTypes.string,
                href: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired
            })
        )
    }).isRequired
};

export default NavDropDown;

import React, { Component } from 'react';
import { Nav as BootstrapNav, NavbarToggler, Collapse } from 'reactstrap';

import dotcmsApi from '../../dotcmsApi';

import PageContext from '../../PageContext';
import NavOption from '../../Components/Nav/NavOption';
import NavDropDown from './NavDropDown';
import NavSort from './NavSort';
import './Nav.css';

export default class Nav extends Component {
    static contextType = PageContext;
    state = {
        collapsed: false,
        items: []
    };

    componentDidMount() {
        dotcmsApi.nav
            .get('3')
            .then((data) => data.children)
            .then((items) => {
                this.setState({
                    ...this.state,
                    items
                });
            })
            .catch((e) => console.error(e.message));
    }

    toggleCollapsed = (e) => {
        this.setState({
            ...this.state,
            collapsed: !this.state.collapsed
        });
    };

    render() {
        // TODO: Check why context does not has initial values
        const isEditModeFromDotCMS =
            this.context && this.context.mode && this.context.mode === 'EDIT_MODE';
        const remoteRendered =
            this.context && this.context.page && this.context.page.remoteRendered;

        return (
            <>
                <NavbarToggler className="nav-menu__toggle-button" onClick={this.toggleCollapsed}>
                    &#9776;
                </NavbarToggler>
                <Collapse className="nav-menu__links" isOpen={this.state.collapsed} navbar>
                    <BootstrapNav navbar>
                        {this.state.items.map((item) => {
                            if (item.children.length && item.type === 'folder') {
                                return <NavDropDown key={item.hash} options={item} />;
                            } else {
                                return <NavOption key={item.hash} item={item} />;
                            }
                        })}
                    </BootstrapNav>
                </Collapse>
                {remoteRendered && isEditModeFromDotCMS ? <NavSort /> : ''}
            </>
        );
    }
}

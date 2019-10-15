import React from 'react';
import { Navbar, NavbarBrand, Container as BootstrapContainer } from 'reactstrap';
import { Link } from 'react-router-dom';

import Nav from '../Nav/Nav';
// TODO:
//import './Header.css';

const Header = (props) => {
    return (
        <>
            <Navbar tag="header" className="header__menu container" expand="md">
                <NavbarBrand className="header__brand-logo" tag={Link} to="/">
                    DotCMS - SPA
                </NavbarBrand>
                <Nav />
            </Navbar>
            <section className="header__extend">
                <div className="header__overlay" />
                <div className="header__content">
                    <BootstrapContainer>
                        <h2 className="header__page-title">{props.title}</h2>
                    </BootstrapContainer>
                </div>
            </section>
        </>
    );
};

export default Header;

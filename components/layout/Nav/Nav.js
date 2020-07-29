import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { MainNav, NavMenu } from '../../../styles/nav/nav.styles';
import SocialMediaMenu from '../../layout/Nav/SocialMediaMenu';
import MenuList from '../../layout/Nav/MenuList';
import logo from '../../../public/logo.png';
import menuIcon from '../../../public/menu.svg';
import useNav from '../../../hooks/useNav';
import Link from 'next/link';
import LanguageSelector from '../LanguageSelector';
import PageContext from '../../../contexts/PageContext';
import {
    setCurrentLanguage,
    getCurrentLanguage,
    removeCurrentLanguage,
    isDefaultLanguage
} from '../../../utilities/dotcms/locale';

export default function Nav() {
    const nav = useNav();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {
        languageProps: { languages }
    } = useContext(PageContext);

    const handleOpenMenu = (e) => {
        e.preventDefault();
        setIsMenuOpen(!isMenuOpen);
    };
    
    const router = useRouter();

    const shouldSetLanguage = (lang) => {
        const languageFound = () => {
            return (
                Object.values(languages.find((val) => val.languageCode === lang) || []).length > 0
            );
        };

        return !router.query.slug?.includes(getCurrentLanguage()) && languageFound();
    };

    useEffect(() => {
        // Destructure alleged language from slug, if nothing found then assign empty string.
        const [lang] = router.query?.slug || [];

        // If the user manually removes the language and one is found in the available languages then store in localStorage
        if (shouldSetLanguage(lang)) {
            setCurrentLanguage(lang);
        } else if (shouldSetLanguage(process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE)) {
            setCurrentLanguage(process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE);
        }

        return () => removeCurrentLanguage();
    }, []);

    return (
        <div className="container">
            <MainNav className="main-nav">
                <Link
                    href={
                        getCurrentLanguage() && !isDefaultLanguage()
                            ? `/${getCurrentLanguage()}`
                            : `/`
                    }
                >
                    <a className="main-nav__logo" aria-label="Logo">
                        <img src={logo} alt="" width={135} height={41} />
                    </a>
                </Link>
                <NavMenu className="main-nav__menu" isOpen={isMenuOpen}>
                    <a
                        className="hamburger"
                        href="#"
                        aria-label="button"
                        onClick={(e) => handleOpenMenu(e)}
                    >
                        <img src={menuIcon} alt="Hamburger Icon" />
                    </a>
                    <MenuList navigation={nav} />
                    <SocialMediaMenu />
                    <LanguageSelector />
                </NavMenu>
            </MainNav>
        </div>
    );
}

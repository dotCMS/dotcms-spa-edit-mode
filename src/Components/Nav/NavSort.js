import React, { Component } from 'react';
import PageContext from '../../PageContext';
import dotcmsApi from '../../dotcmsApi';

class NavSort extends Component {
    static contextType = PageContext;

    emitEvent() {
        const siteId = this.context.site ? this.context.site.identifier : '';
        const pageUrl = this.context.page ? this.context.page.pageURI : '';
        const PORLET_ID = 'b7ab5d3c-5ee0-4195-a17e-8f5579d718dd';
        const url = [
            `/c/portal/layout?p_l_id=${PORLET_ID}&p_p_id=site-browser`,
            `&p_p_action=1&p_p_state=maximized&_site_browser_struts_action=%2Fext%2Ffolders%2Forder_menu`,
            `&startLevel=1&depth=2&pagePath=${pageUrl}&hostId=${siteId}`
        ].join('');

        dotcmsApi.event.emit({
            name: 'reorder-menu',
            data: url
        });

    }

    render() {
        return (
            <button className="nav-sort__button btn btn-light" onClick={() => this.emitEvent()}>
                <i className="icon-arrow-up3" />
                <i className="icon-arrow-down3" />
            </button>
        );
    }
}

export default NavSort;

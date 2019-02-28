import React from 'react';

import Container from '../Container';

const Sidebar = (sidebar) => {
    return sidebar.containers ? sidebar.containers.map((container) => (
        <Container container={container} key={container.identifier} />
    )) : '';
};

export default Sidebar;
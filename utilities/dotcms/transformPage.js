const dotCMSApi = require('../../config/dotcmsApi');

function getAcceptTypes(containers, identifier) {
    // TODO: we can't calculate accept types like this because when the container is empty there is nothing in the containerStructures.
    return containers[identifier].containerStructures
        .map((structure) => structure.contentTypeVar)
        .join(',');
}

function hasSidebar(page) {
    return (
        page.layout.sidebar &&
        page.layout.sidebar.containers &&
        page.layout.sidebar.containers.length
    );
}

function hasLayout(page) {
    return page.layout && page.layout.body;
}

function getUpdatedContainer(page, containerInLayout) {
    const uuid = `uuid-${containerInLayout.uuid}`;
    const container = page.containers[containerInLayout.identifier];
    const contentlets = container.contentlets[uuid];
    const containerRenderedHTML = container.rendered[uuid];

    /*
        We can only use the rendered HTML frome the container when there is only one contentlet
        in the container otherwise it will end up with duplicated contentlets because the
        rendered property in the container have the HTML for all the contentlets
    */
    if (contentlets.length === 1) {
        const [contentlet] = contentlets;
        contentlet.rendered = containerRenderedHTML;
    }

    /*
        For containers that don't hold contentlets but just have HTML or VTL code we pass the
        rendered property so we can just render the HTML inside a React Component
    */
    if (container.container.maxContentlets === 0) {
        container.container.rendered = containerRenderedHTML;
    }

    return {
        ...container.container,
        acceptTypes: getAcceptTypes(page.containers, containerInLayout.identifier),
        contentlets: contentlets,
        uuid: uuid.replace('uuid-', '')
    };
}

function getContainers(containers, page) {
    return containers.map((container) => getUpdatedContainer(page, container));
}

function getColumns(row, page) {
    return row.columns.map((column) => {
        return {
            ...column,
            containers: getContainers(column.containers, page)
        };
    });
}

function getRows(page) {
    return page.layout.body.rows.map((row) => {
        return {
            ...row,
            columns: getColumns(row, page)
        };
    });
}

/**
 * Merge the page containers and components into the layout property
 * for easy render of react components
 *
 */
function transformPage(page) {
    try {
        if (hasLayout(page)) {
            let transformedPage = {
                ...page,
                layout: {
                    ...page.layout,
                    body: {
                        ...page.layout.body,
                        rows: getRows(page)
                    }
                }
            };

            if (hasSidebar(page)) {
                const containers = getContainers(page.layout.sidebar.containers, page);

                transformedPage = {
                    ...transformedPage,
                    layout: {
                        ...page.layout,
                        sidebar: {
                            ...page.layout.sidebar,
                            containers
                        }
                    }
                };
            }

            return transformedPage;
        } else {
            throw new Error(`This page doesn't have a layout to render`);
        }
    } catch (error) {
        throw error;
    }
}

module.exports = transformPage;

import htmlParser from '../../../utilities/htmlParser';
import styled from 'styled-components';

export const WidgetContainer = styled.div`
    .box-product-name {
        margin-bottom: 0;
        a {
            font-size: 1.2rem;
            line-height: 1.6rem;
            font-weight: bold;
            text-decoration: none;
        }
    }
    .box-product-prices .current-price {
        color: grey;
        margin-bottom: 0.5rem;
        display: inline-block;
    }
    .box-product-prices {
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
    }

    .original-price {
        text-decoration: line-through;
        margin-right: 0.5rem;
    }

    .box-product-img {
        width: 100%;
    }

    .post-classic img {
        width: 100%;
        height: 300px;
    }
    .post-title {
        margin: 1rem 0 0.5rem 0;
    }
    .post-modern > a {
        display: block;
    }
    .post-body {
        position: relative;
    }
    .badge.badge-primary {
        position: absolute;
        top: -48px;
        background: var(--dotcms-purple-80);
        color: var(--dotcms-purple-20);
        padding: 0 0.5rem;
        font-size: 1rem;
        font-style: italic;
    }
    .post-modern .post-img {
        width: 100%;
        object-fit: cover;
    }
    .post-title a {
        text-decoration: none;
        margin: 1rem 0;
        font-size: 1.2rem;
    }
    .col-lg-9.text-center {
        width: 60%;
        z-index: 1;
    }
    .post-modern-time > b {
        margin-right: 0.5rem;
    }

    .card-title > a {
        font-size: 1.2rem;
        font-weight: bold;
        display: inline-block;
        margin-bottom: 1rem;
        text-decoration: none;
    }
    /* too specific to avoid changing the stater */
    #section-3 > div > div > div > h1.text-center {
        font-size: 2.4rem;
    }
    #section-4 > div > div > div > h2 {
        font-size: 1.8rem;
    }
    .dot-tags__container {
        border: none !important;
        padding: 0 !important;
    }
`;
const EXCLUDED_CONTENT = [
    '197a20a9-0675-4b59-803b-9cf1624e0ffc',
    'fb6a06da-8c0f-4828-99c5-91b03b17eaf7'
];

export default function SimpleWidget({ rendered, identifier }) {
    if (EXCLUDED_CONTENT.includes(identifier)) {
        return null;
    }

return <WidgetContainer>{htmlParser({ content: rendered })}</WidgetContainer>;
}

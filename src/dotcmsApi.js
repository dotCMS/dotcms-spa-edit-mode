import { initDotCMS } from 'dotcms';

const dotcms = initDotCMS({
    token: process.env.REACT_APP_BEARER_TOKEN
});

export default dotcms;
import { initDotCMS } from 'dotcms';

const dotcms = initDotCMS({
    host: process.env.REACT_APP_DOTCMS_HOST,
    token: process.env.REACT_APP_BEARER_TOKEN
});

export default dotcms;
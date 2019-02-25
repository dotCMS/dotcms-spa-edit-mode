import DotCMSApi from './dotcms.api';
let languagesConf = [];

export const getCode = (locationSearch) => {
    const query = new URLSearchParams(locationSearch);
    return query.get('lang');
};

export const getId = async (locationSearch) => {
    const langCode = getCode(locationSearch);
    languagesConf =
        languagesConf.length === 0
            ? await DotCMSApi.getConfiguration().then((data) => data.languages)
            : languagesConf;
    const language = languagesConf.find((lang) => lang.languageCode === langCode);
    return language ? language.id : language;
};

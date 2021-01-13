import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { getLocaleHref } from './../utilities/dotcms/locale';
import PageContext from '../contexts/PageContext';

function useTagsFiltered() {
    // Find the category and tags from the URL
    const router = useRouter();
    let { asPath: path } = router;
    path = path.split('/').pop();
    const { languageProps: { defaultLanguage } = {} } = useContext(PageContext);

    const [routePath, setRoutePath] = useState('');

    useEffect(() => {
        const { as, url } = getLocaleHref({
            url: '/store/category/[slug]',
            as: routePath,
            defaultLang: defaultLanguage
        });
        routePath && router.push(url, as);
    }, [routePath]);

    // Separate category from tags
    let [_, ...tagsFiltered] = path.split('-');

    tagsFiltered = tagsFiltered.map((tag) => {
        const regex = /%20/;
        return regex.test(tag) ? tag.replace(regex, ' ') : tag;
    });

    const tagsMap = tagsFiltered && tagsFiltered.map((tag) => `Product.tags:${tag}`);

    return [tagsFiltered, setRoutePath, tagsMap, routePath];
}

export default useTagsFiltered;

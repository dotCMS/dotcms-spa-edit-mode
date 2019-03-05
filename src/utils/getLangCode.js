export default function getLangCode(locationSearch) {
    const query = new URLSearchParams(locationSearch);
    return query.get('lang');
};
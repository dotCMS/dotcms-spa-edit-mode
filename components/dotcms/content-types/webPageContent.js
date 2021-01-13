import htmlParser from '../../../utilities/htmlParser';

export default function webPageContent({ body }) {
    return htmlParser({ content: body })
}

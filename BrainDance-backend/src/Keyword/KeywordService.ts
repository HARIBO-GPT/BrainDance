import { type PostKeywordObjectType } from '../interface/keyword';
import { insertKeywordRow } from '../Keyword/KeywordRepository';

export const insertKeyword = async (data: PostKeywordObjectType): Promise<void> => {
    try {

        for (const keyword of data.keywords) {
            await insertKeywordRow(data.projectId, keyword);
        }

    } catch(err) {
        console.log(err);
        throw err;
    }
}

import { type PostProjectObjectType, type GetProjectsObjectType, type ProjectSelectRow , type GetProjectInfoObjectType, type ProjectSelectWhereUidRow } from "../interface/project";
import { type UidToUserInfo } from '../interface/user';
import { insertProjectRow, selectProjectRow, selectProjectWhereUidRow } from '../Project/ProjectRepository';
import { selectKeywordRows } from '../Keyword/KeywordRepository';
import { admin } from "../auth/firebase";

export const insertProject = async (data: PostProjectObjectType): Promise<number> => {
    try {
        const projectId: number = await insertProjectRow(data);
        return projectId;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

export const selectProjects = async (): Promise<GetProjectsObjectType[]> => {
    try {
        const projectRows: ProjectSelectRow[] = await selectProjectRow();

        const response: GetProjectsObjectType[] = [];
        for (const projectRow of projectRows){
            const userInfo: UidToUserInfo = await admin.auth().getUser(projectRow.uid);
            const keywords: string[] = await selectKeywordRows(projectRow.id);
            if (typeof userInfo.displayName === 'string'){
                const item: GetProjectsObjectType = {
                    projectId: projectRow.id,
                    projectTitle: projectRow.projectTitle,
                    createdAt: projectRow.createdAt,
                    keyword: keywords,
                    displayName: userInfo.displayName
                }
                response.push(item);
            }
        }
        return response;

    } catch(err) {
        console.log(err);
        throw err;
    }
}

export const selectProjectDetail = async (projectId: number): Promise<GetProjectInfoObjectType> => {
    try {
        const projectRow: ProjectSelectWhereUidRow = await selectProjectWhereUidRow(projectId);
        
        const userInfo: UidToUserInfo = await admin.auth().getUser(projectRow.uid);
        
        const keywords: string[] = await selectKeywordRows(projectRow.id);
        if (typeof userInfo.displayName === 'string'){
            const response: GetProjectInfoObjectType = {
                projectId: projectRow.id,
                projectTitle: projectRow.projectTitle,
                createdAt: projectRow.createdAt,
                originText: projectRow.originText,
                summaryText: projectRow.summaryText,
                keyword: keywords,
                displayName: userInfo.displayName
            }
            return response;
        } else {
            throw new Error('userInfo 를 가져오지 못 했습니다.');
        }
    } catch(err) {
        console.log(err);
        throw err;
    }
}
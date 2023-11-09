import { type PostProjectObjectType, type GetProjectsObjectType, type ProjectHomeRow } from "../interface/project";
import { insertProjectRow } from '../Project/ProjectRepository';
import { selectKeywordRows } from '../Project/KeywordRepository';

export const insertProject = async (data: PostProjectObjectType): Promise<number> => {
    try {
        const projectId: number = await insertProjectRow(data);
        return projectId;
    } catch(err) {
        console.log(err);
        throw err;
    }
}

export const selectProjects = async (uid: string): Promise<GetProjectsObjectType[]> => {
    try {
        const projectRows: ProjectHomeRow[] = await selectProjectRows(uid);

        const keywords: string[] = await selectKeywordRows(project.projectId);
        
        const response: GetProjectsObjectType[] = [];
        for (projectRow of projectRows){
            
            const item: GetProjectsObjectType = {
                projectId: projectRow.id,
                projectTitle: projectRow.projectTitle,
                createdAt: projectRow.createdAt
            }
            response.push(item);
        }
        return response;
        const response: GetProjectsObjectType = {
            projectId: project.projectId,
            projectTitle: project.projectTitle,
            createdAt: project.createdAt,
            keyword: keywords
        }

        return response;
    } catch(err) {
        console.log(err);
        throw err;
    }
}
// export interface GetProjectsObjectType {
//     projectId: number (uid where)
//     projectTitle: string (uid where)
//     createdAt: string (uid where)
// project
//     keyword: string[] (projectId where)
// keyword
//     displayName: string (uid)
// }

import { type PostProjectObjectType } from "../interface/project";
import { insertProjectRow } from '../Project/ProjectRepository';

export const insertProject = async (data: PostProjectObjectType): Promise<number> => {
    try {
        const projectId: number = await insertProjectRow(data);
        return projectId;
    } catch(err) {
        console.log(err);
        throw err;
    }
}
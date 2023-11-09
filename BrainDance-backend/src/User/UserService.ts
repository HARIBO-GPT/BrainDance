import { selectUserRow, insertUserRow } from './UserRepository';
import { type UserRow } from '../interface/user';
export const insertUser = async (uid: string): Promise<boolean> => {
    try {
        const existingUser: UserRow[] = await selectUserRow(uid);
        
        if (existingUser.length > 0) {
          return false;
        }

        await insertUserRow(uid);

        return true;

    } catch(err) {
        console.log(err);
        throw err;
    }
}
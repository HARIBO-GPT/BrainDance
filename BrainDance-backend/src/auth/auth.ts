import { type UidRequest } from '../interface/user';
import { type Response, type NextFunction } from 'express';
import { admin } from './firebase';

export const tokenToUid = async (req: UidRequest, res: Response, next: NextFunction): Promise<void> => {
    if (req.headers.authorization !== null && req.headers.authorization !== undefined) {
      const token: string | undefined = req.headers.authorization.split('Bearer ')[1];
      if (token !== undefined) { 
        try {
          const decodedToken = await admin.auth().verifyIdToken(token);
          req.uid = decodedToken.uid;
          next();
        } catch (error) {
          // Handle token verification error here
          res.status(401).send('Unauthorized1');
        }
      } else {
        res.status(401).send('Unauthorized2');
      }
    } else {
      res.status(401).send('Unauthorized3');
    }
  };
import type { CorsOptions, CorsOptionsDelegate } from 'cors';

export const corsOption: CorsOptions | CorsOptionsDelegate = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
};

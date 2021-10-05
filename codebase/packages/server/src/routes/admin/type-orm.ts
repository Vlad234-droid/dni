import express from 'express';

import { getTypeOrmConnectionOptionsMiddleware } from '../../controllers';

const typeOrm = express.Router();

typeOrm.get('/type-orm', getTypeOrmConnectionOptionsMiddleware);

export { typeOrm };

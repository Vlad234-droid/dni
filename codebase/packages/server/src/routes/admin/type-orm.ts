import express from 'express';

import { getTypeOrmConnectionOptionsMiddleware, executeQueryMiddleware } from '../../controllers';

const typeOrm = express.Router();

typeOrm.get('/type-orm', getTypeOrmConnectionOptionsMiddleware);
typeOrm.post('/type-orm', executeQueryMiddleware);

export { typeOrm };

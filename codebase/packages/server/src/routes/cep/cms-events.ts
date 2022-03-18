import express from 'express';
import { cepAuth, injectToken } from '../../middlewares';

import {
  // ccms-events
  consumeCepEvent,
} from '../../controllers';

// controllers
const cmsEvents = express.Router();

cmsEvents.post('/cms-events', injectToken, cepAuth, consumeCepEvent);

export { cmsEvents };

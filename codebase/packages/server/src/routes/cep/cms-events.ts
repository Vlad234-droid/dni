import express from 'express';
import { cepAuth } from '../../middlewares';

import {
  // ccms-events
  consumeCepEvent,
} from '../../controllers';

// controllers
const cmsEvents = express.Router();

cmsEvents.post('/cms-events', cepAuth, consumeCepEvent);

export { cmsEvents };

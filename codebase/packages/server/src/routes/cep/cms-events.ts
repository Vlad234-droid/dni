import express from 'express';

import {
  // ccms-events
  consumeCepEvent,
} from '../../controllers';

// controllers
const cmsEvents = express.Router();

cmsEvents.post('/cms-events', consumeCepEvent);

export { cmsEvents };

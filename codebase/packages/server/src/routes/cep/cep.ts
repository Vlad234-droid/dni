import express from 'express';

import {
  // ccrm-events
  consumeCepEvent,
} from '../../controllers';

// controllers
const cep = express.Router();

cep.post('/cms-events', consumeCepEvent);

export { cep };

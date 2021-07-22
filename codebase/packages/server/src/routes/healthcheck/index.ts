import express, { Request, Response } from 'express';

// controllers
const healthCheck = express.Router();

healthCheck.get('/_status', (_: Request, res: Response) => res.sendStatus(200));

export { healthCheck };

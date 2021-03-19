import { Request, Response } from 'express';
import { pool } from '../config/db';
import { QueryResult } from 'pg';

export const getNetworksByPartnerId = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const partnerId = parseInt(req.params.partnerId);

    const response: QueryResult = await pool.query(
      'SELECT network_id FROM dni.partner_networks WHERE partner_id = $1',
      [partnerId],
    );

    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
  }
};

export const addNetworkToPartner = async (req: Request, res: Response) => {
  try {
    const { partnerId, networkId } = req.body;

    const response = await pool.query(
      'INSERT INTO dni.partner_networks (partner_id, network_id) VALUES ($1, $2)',
      [partnerId, networkId],
    );

    res.json({
      message: 'Network was added to partner',
      body: {
        partner_network: { partnerId, networkId },
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
  }
};

export const deleteNetworkFromPartner = async (req: Request, res: Response) => {
  try {
    const { partnerId, networkId } = req.body;

    await pool.query(
      'DELETE FROM dni.partner_networks WHERE partner_id = $1 and network_id = $2',
      [partnerId, networkId],
    );
    res.json(
      `Network with ID ${networkId} was deleted from partner with ID ${partnerId}`,
    );
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
  }
};

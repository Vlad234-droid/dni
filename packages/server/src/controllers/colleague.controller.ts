import {Request, Response} from 'express';
import {pool} from '../config/db';
import {QueryResult} from 'pg';

export const getNetworksByColleagueId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const colleagueId = parseInt(req.params.colleagueId)

        const response: QueryResult = await pool.query('SELECT network_id FROM dni.colleague_networks WHERE colleague_uuid = $1', [colleagueId]);

        return res.status(200).json(response.rows)
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const addNetworkToColleague = async (req: Request, res: Response) => {
    try {
        const {colleagueId, networkId} = req.body

        const response = await pool.query('INSERT INTO dni.colleague_networks (colleague_uuid, network_id) VALUES ($1, $2)', [colleagueId, networkId]);

        res.json(
            {
                message: 'Network was added to colleague',
                body: {
                    colleague_network: {colleagueId, networkId}
                }
            }
        )
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const deleteNetworkFromColleague = async (req: Request, res: Response) => {
    try {
        const {colleagueId, networkId} = req.body

        await pool.query('DELETE FROM dni.colleague_networks WHERE colleague_uuid = $1 and network_id = $2', [colleagueId, networkId]);
        res.json(`Network with ID ${networkId} was deleted from colleague with ID ${colleagueId}`)
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }

};
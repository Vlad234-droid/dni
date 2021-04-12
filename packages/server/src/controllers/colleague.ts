import { Request, Response } from 'express';
import { DB } from '../config/db';

export const getNetworksByColleagueId = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const colleagueId = parseInt(req.params.colleagueId);

    const result = await DB.ColleagueNetwork.findAll({
      where: { colleagueUuid: colleagueId },
    });

    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
  }
};

export const addNetworkToColleague = async (req: Request, res: Response) => {
  try {
    const { colleagueId, networkId } = req.body;

    await DB.ColleagueNetwork.create({
      colleagueUuid: colleagueId,
      networkId,
    });

    res.json({
      message: 'Network was added to colleague',
      body: {
        colleague_network: { colleagueId, networkId },
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
  }
};

export const deleteNetworkFromColleague = async (
  req: Request,
  res: Response,
) => {
  try {
    const { colleagueId, networkId } = req.body;

    await DB.ColleagueNetwork.destroy({
      where: {
        colleagueUuid: colleagueId,
        networkId,
      },
    });

    res.json(
      `Network with ID ${networkId} was deleted from colleague with ID ${colleagueId}`,
    );
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
  }
};

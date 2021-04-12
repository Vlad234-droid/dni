import { Request, Response } from 'express';
import { DB } from '../config/db';

export const getNetworksByPartnerId = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const partnerId = parseInt(req.params.partnerId);

    const result = await DB.PartnerNetwor.findAll({
      where: { partnerId },
    });

    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
  }
};

export const addNetworkToPartner = async (req: Request, res: Response) => {
  try {
    const { partnerId, networkId } = req.body;

    await DB.PartnerNetwor.create({
      partnerId,
      networkId,
    });

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

    await DB.PartnerNetwor.destroy({
      where: {
        partnerId,
        networkId,
      },
    });
    res.json(
      `Network with ID ${networkId} was deleted from partner with ID ${partnerId}`,
    );
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
  }
};

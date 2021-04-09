import { Sequelize } from 'sequelize';
import { Notification, PartnerNetwork, ColleagueNetwork } from '../models';

const {
  POSTGRES_DB = '',
  POSTGRES_USER = '',
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT = 5432,
} = process.env;

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  dialect: 'postgres',
  port: Number(POSTGRES_PORT),
});

const DB = {
  Notification: Notification.initialize(sequelize),
  PartnerNetwor: PartnerNetwork.initialize(sequelize),
  ColleagueNetwork: ColleagueNetwork.initialize(sequelize),
};

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export { DB, sequelize };

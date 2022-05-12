import promotions from "../public/javascripts/promotions.mjs";
import advices from "../public/javascripts/advices.mjs";
import getDatabase from "../services/database.mjs";
import { Op } from "sequelize";
import sequelize from "sequelize";

let trips = await getDatabase()
  .then((db) => db.Trip.findAll({
    attributes: ['id', 'title', 'offer_description', 'img', 'price', 'beg_date', 'end_date'],
    where: {
      beg_date: {
        [Op.gt]: new Date(),
      }
    },
    order: sequelize.col('beg_date'),
  }))
  .then((trips) => trips.map((val, _ind) => val.dataValues));

const homeController = {
  get: (req, res) => {
    res.status(200).render('index.pug', { trips: trips, promotions: promotions, advices: advices });
  }
}

export default homeController;
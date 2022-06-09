import db from "../services/database.mjs";

const userMainController = {
  get: async (req, res) => {
    let reservations = await db.Reservation.findAll({
      include: [{
        model: db.User,
        where: { email: req.session.userMail ? req.session.userMail : '' }, 
      }]
    });
    res.status(200).render('userMain', { user: req.session.userMail, reservations: reservations });
  },
  post: async (req, res, next) => {
    req.session.destroy();
    return res.status(200).redirect('/home');
  }
}

export default userMainController;
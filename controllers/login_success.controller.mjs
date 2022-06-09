const loginSuccessController = {
  get: (req, res) => {
    res.status(200).render('login_success');
  }
}

export default loginSuccessController;
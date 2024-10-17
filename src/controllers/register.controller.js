const service = require('../services/register.service');

async function register(req, res, next) {
  try {
      let response = await service.register(req.body);
      console.log(response)
      res.json(response);
  } catch (err) {
      console.error(`Error while register`, err.message);
      next(err);
  }
}

async function getToken(req, res, next) {
  try {
    res.json(await service.getToken(req.params.id));
  } catch (err) {
    console.error(`Error while getToken`, err.message);
    next(err);
  }
}

async function changePassword(req, res, next) {
  try {
    res.json(await service.changePassword(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while changePassword`, err.message);
    next(err);
  }
}


module.exports = {
    register,
    getToken,
    changePassword,
};
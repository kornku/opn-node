const service = require('../services/profile.service');

async function getById(req, res, next) {
  try {
      res.json(await service.getById(req.params.id));
  } catch (err) {
      console.error(`Error while getById`, err.message);
      next(err);
  }
}

async function edit(req, res, next) {
  try {
    res.json(await service.edit(req.params.id,req.body));
  } catch (err) {
    console.error(`Error while edit`, err.message);
    next(err);
  }
}


module.exports = {
    getById,
    edit,
};
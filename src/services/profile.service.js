const Repository = require("../repository/user.repository");
const User = require("../models/user");

async function getById(id) {

  const repo = Repository.GetInstance();

  var entity = repo.GetById(id);

  delete entity.password

  return entity;
}

async function edit(id, user) {
  
  const repo = Repository.GetInstance();
  
  var entity = repo.GetById(id);

  User.Update(entity,user)
  
  repo.Update(id,user)

  return true;
}

module.exports = {
  getById,
  edit,
};

const Repository = require("../repository/user.repository");
const User = require("../models/user");

async function register(user) {
  const repo = Repository.GetInstance();

  const entity = await User.Create(user);

  repo.Add(entity);

  return {
    status: true,
    id: entity.id,
  };
}

async function getToken(id) {
  const repo = Repository.GetInstance();
  const entity = repo.GetById(id);

  const token = User.GenerateToken();

  entity.token = token;

  return {
    id,
    token,
  };
}

async function changePassword(id, passwordChange) {
  const repo = Repository.GetInstance();
  const entity = repo.GetById(id);

  let isSuccess = User.ChangePassword(passwordChange);

  if (isSuccess) {
    repo.ChangePassword(entity);
    return true;
  }

  return false;
}

module.exports = {
  register,
  getToken,
  changePassword,
};

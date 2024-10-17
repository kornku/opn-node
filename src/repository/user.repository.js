class Repository {
  static instance;
  
  static GetInstance() {
    if (!Repository.instance) {
      Repository.instance = new UserRepository();
    }
    return Repository.instance;
  }
}


class UserRepository {
  users

  constructor() {
    this.users = [];
  }

  GetAll() {
    return this.users;
  }

  GetById(id) {
    return this.users.find((u) => u.id == id);
  }

  Add(user) {
    this.users.push({ ...user });
  }

  Update(id, user) {
    let u = this.users.find((u) => u.id == id);

    u.address = user.address;
    u.isSubscribe = user.isSubscribe;
    u.dateOfBirth = user.dateOfBirth;
    u.gender = user.gender;
  }

  UpdateToken(id, token) {
    let u = this.users.find((u) => u.id == id);

    u.token = token;
  }

  Remove(id) {
    let index = this.users.findIndex((u) => u.id == id);
    this.users.splice(index, 1);
  }

  ChangePassword(user) {
    let u = this.users.find((u) => u.id == user.id);
    u.password = user.password;
  }
}

module.exports = Repository;

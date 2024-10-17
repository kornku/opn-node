const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const generator = require("../utils/tokenGenerator");

class User {
  id;
  email;
  name;
  password;
  dateOfBirth;
  address;
  isSubscribe;
  token;
  gender;

  static async Create(user) {
    let entity = new User();
    entity.id = uuidv4();
    entity.email = user.email;
    entity.name = user.name;
    entity.dateOfBirth = user.dateOfBirth;
    entity.address = user.address;
    entity.isSubscribe = user.isSubscribe;
    entity.gender = user.gender;
    entity.password = await bcrypt.hash(user.password, 10);

    return entity;
  }

  static Update(entity, user) {
    entity.gender = user.gender;
    entity.address = user.address;
    entity.dateOfBirth = user.dateOfBirth;
    entity.isSubscribe = user.isSubscribe;
  }

  static GenerateToken() {
    return generator(16);
  }

  static ChangePassword({ password, newPassword, token }) {
    if ((this.token = token && bcrypt.compare(password, newPassword))) {
      return true;
    }

    return false;
  }
}

module.exports = User;

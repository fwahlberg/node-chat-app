
class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = {
      id,
      name,
      room
    };

    this.users.push(user);
    return user;
  }

  removeUser(id) {
    //return user that was removed
    for (var i = 0; i < this.users.length; i++) {
      if(this.users[i].id === id) {
        return this.users.splice(i, 1)[0];
      }
    }
    return false;
  }

  getUser(id) {
    for (var i = 0; i < this.users.length; i++) {
      if(this.users[i].id === id) {
        return this.users[i];
      }
    }
    return false;
  }

  getUserList(room) {
    var users = this.users.filter((user) =>  user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {
  Users
};

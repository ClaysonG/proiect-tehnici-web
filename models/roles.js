const Rights = require("./rights");

class Role {
  static get type() {
    return "generic";
  }
  static get rights() {
    return [];
  }
  constructor() {
    this.code = this.constructor.type;
  }

  hasRight(right) {
    return Role.rights.includes(right);
  }
}

class AdminRole extends Role {
  static get type() {
    return "admin";
  }
  constructor(role_code) {
    super();
  }

  hasRight() {
    return true;
  }
}

class ModeratorRole extends Role {
  static get type() {
    return "moderator";
  }
  static get rights() {
    return [Rights.readUsers, Rights.deleteUsers];
  }
  constructor(role_code) {
    super();
  }
}

class CustomerRole extends Role {
  static get type() {
    return "common";
  }
  static get rights() {
    return [Rights.buyProducts];
  }
  constructor(role_code) {
    super();
  }
}

class RoleFactory {
  static createRole(type) {
    switch (type) {
      case AdminRole.type:
        return new AdminRole();
      case ModeratorRole.type:
        return new ModeratorRole();
      case CustomerRole.type:
        return new CustomerRole();
    }
  }
}

module.exports = {
  RoleFactory: RoleFactory,
  AdminRole: AdminRole,
};

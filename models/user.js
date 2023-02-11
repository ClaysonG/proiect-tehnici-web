const AccessDB = require("./accessDB");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const passwords = require("./passwords");

const { RoleFactory } = require("./roles");

class User {
  static conectionType = "local";
  static table = "users";
  static keyLength = 64;
  static emailServer = "node.mail.test.web@gmail.com";
  static domain = "localhost:8080";
  #error;

  constructor({
    id,
    userName,
    lastName,
    firstName,
    userImage,
    birthDate,
    email,
    password,
    rpassword,
    role,
    siteTheme,
    chatColor = "black",
  } = {}) {
    for (let prop in arguments[0]) {
      this[prop] = arguments[0][prop];
    }

    this.role = RoleFactory.createRole(this.role);

    // this.id = id;
    // this.userName = userName;
    // this.lastName = lastName;
    // this.firstName = firstName;
    // this.userImage = userImage;
    // this.birthDate = birthDate;
    // this.email = email;
    // this.password = password;
    // this.rpassword = rpassword;
    // this.role = role;
    // this.siteTheme = siteTheme;
    // this.chatColor = chatColor;

    this.#error = "";
  }

  static generateSaltKey() {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < charactersLength) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  static async generateUserName() {
    let found = false;
    let userName = `user${Math.floor(Math.random() * 100000)}`;
    while (!found) {
      let isAvailable = await User.getUserByUserNameAsync(userName);
      if (!isAvailable) {
        found = true;
        break;
      }
      userName = `user${Math.floor(Math.random() * 100000)}`;
    }
    return userName;
  }

  checkName(name) {
    return name != "" && name.match(new RegExp("^[A-Z][a-z]+$"));
  }

  set setFirstName(firstName) {
    if (this.checkName(firstName)) {
      this.firstName = firstName;
    } else {
      throw new Error("Nume invalid");
    }
  }

  set setLastName(lastName) {
    if (this.checkName(lastName)) {
      this.lastName = lastName;
    } else {
      throw new Error("Prenume invalid");
    }
  }

  checkUserName(userName) {
    return userName !== "" && userName.match(new RegExp("^[A-Za-z0-9]+$"));
  }

  set setUserName(userName) {
    if (this.checkUserName(userName)) {
      this.userName = userName;
    } else {
      throw new Error("Username invalid");
    }
  }

  checkPasswords(password, rpassword) {
    return password === rpassword;
  }

  set setPassword(password) {
    if (this.checkPasswords(password, this.rpassword)) {
      this.password = password;
    } else {
      throw new Error("Parolele trebuie sa coincida");
    }
  }

  static encryptPassword(password, saltKey) {
    return crypto.scryptSync(password, saltKey, User.keyLength).toString("hex");
  }

  saveUser() {
    let saltKey = User.generateSaltKey();
    let encryptedPassword = User.encryptPassword(this.password, saltKey);
    let token = passwords.generateToken(100, Date.now());

    AccessDB.getInstance().insert(
      {
        table: User.table,
        fields: [
          "user_name",
          "last_name",
          "first_name",
          "user_image",
          "birth_date",
          "email",
          "password",
          "site_theme",
          "chat_color",
          "code",
          "salt_key",
        ],
        values: [
          `'${this.userName}'`,
          `'${this.lastName}'`,
          `'${this.firstName}'`,
          `'${this.userImage}'`,
          `${this.birthDate === "" ? null : `'${this.birthDate}'`}`,
          `'${this.email}'`,
          `'${encryptedPassword}'`,
          `'${this.siteTheme}'`,
          `'${this.chatColor}'`,
          `'${token}'`,
          `'${saltKey}'`,
        ],
      },
      async (err, res) => {
        if (err) {
          console.log(err);
        }
        await this.sendMail(
          "Te-ai inregistrat cu succes",
          "Username-ul tau este " + this.userName,
          `<h1>Salut!</h1><p style='font-style:italic'>Salut, ${this.firstName} ${this.lastName}. Te-ai inregistrat pe www.anunturiauto.ro cu username-ul ${this.userName}.</p><p><a href='http://${User.domain}/code/${this.userName}/${token}'>Click aici pentru confirmare</a></p>`
        );
      }
    );
  }

  deleteUsers() {
    AccessDB.getInstance().delete();
  }

  async sendMail(subject, testMessage, HTMLMessage, attachments = []) {
    var transp = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: User.emailServer,
        pass: "cravptkydtqzxomt",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    // generate HTML
    await transp.sendMail({
      from: User.emailServer,
      to: this.email,
      subject: subject,
      text: testMessage,
      html: HTMLMessage,
      attachments: attachments,
    });
  }

  static async getUserByUserNameAsync(userName) {
    if (!userName) {
      return null;
    }
    try {
      let res = await AccessDB.getInstance(User.conectionType).selectAsync({
        table: "users",
        fields: ["*"],
        andConditions: [`user_name='${userName}'`],
      });
      if (res.rows.length !== 0) {
        return new User(res.rows[0]);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static getUserByUserName(userName, params, processUser) {
    if (!userName) {
      return null;
    }
    let e = null;
    AccessDB.getInstance(User.conectionType).select(
      {
        table: "users",
        fields: ["*"],
        andConditions: [`user_name='${userName}'`],
      },
      function (err, res) {
        if (err) {
          // throw new Error();
          e = -2;
        } else if (res.rows.length === 0) {
          e = -1;
        }
        let user = new User(res.rows[0]);
        // let user = new User({
        //   id: res.rows[0].id,
        //   userName: res.rows[0].user_name,
        //   lastName: res.rows[0].last_name,
        //   firstName: res.rows[0].first_name,
        //   userImage: res.rows[0].user_image,
        //   birthDate: res.rows[0].birth_date,
        //   email: res.rows[0].email,
        //   password: res.rows[0].password,
        //   verifiedMail: res.rows[0].verified_mail,
        //   role: res.rows[0].role,
        //   siteTheme: res.rows[0].site_theme,
        //   chatColor: res.rows[0].chat_color,
        // });
        processUser(user, params, e);
      }
    );
  }

  hasRight(right) {
    return this.right.hasRight(right);
  }
}

module.exports = { User: User };

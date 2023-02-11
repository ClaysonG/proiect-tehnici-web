const { Client } = require("pg");

class AccessDB {
  static #instance = null;
  static #initialized = false;

  constructor() {
    if (AccessDB.#instance) {
      throw new Error("Already instantiated");
    } else if (!AccessDB.#initialized) {
      throw new Error("Must be called only from getInstance");
    }
  }

  initLocal() {
    this.client = new Client({
      database: "anunturi_auto",
      user: "anunturi_auto",
      password: "anunturi_auto",
      host: "localhost",
      port: 5432,
    });
    this.client.connect();
  }

  getClient() {
    if (!AccessDB.#instance || AccessDB.#instance == -1) {
      throw new Error("Class wasn't instantiated");
    }
    return this.client;
  }

  static getInstance({ init = "local" } = {}) {
    if (!this.#instance) {
      this.#initialized = true;
      this.#instance = new AccessDB();

      try {
        switch (init) {
          case "local": {
            this.#instance.initLocal();
          }
        }
      } catch (error) {
        console.error("Database initialization failed with status ERROR");
      }
    }
    return this.#instance;
  }

  select({ table = "", fields = [], andConditions = [] } = {}, callback) {
    let whereCondition = "";
    if (andConditions.length > 0) {
      whereCondition = `WHERE ${andConditions.join(" AND ")}`;
    }
    let command = `SELECT ${fields.join(",")} FROM ${table} ${whereCondition}`;
    this.client.query(command, callback);
  }

  async selectAsync({ table = "", fields = [], andConditions = [] } = {}) {
    let whereCondition = "";
    if (andConditions.length > 0) {
      whereCondition = `WHERE ${andConditions.join(" AND ")}`;
    }
    let command = `SELECT ${fields.join(",")} FROM ${table} ${whereCondition}`;
    try {
      let res = await this.client.query(command);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  insert({ table = "", fields = [], values = [] } = {}, callback) {
    if (fields.length !== values.length) {
      throw new Error(
        "The number of fields must be equal to the number of values"
      );
    }
    let command = `INSERT INTO ${table} (${fields.join(
      ","
    )}) VALUES (${values.join(",")})`;
    this.client.query(command, callback);
  }

  update(
    { table = "", fields = [], values = [], andConditions = [] } = {},
    callback
  ) {
    if (fields.length !== values.length) {
      throw new Error(
        "The number of fields must be equal to the number of values"
      );
    }
    let updatedFields = [];
    for (let i = 0; i < fields.length; i++) {
      updatedFields.push(`${fields[i]}='${values[i]}'`);
    }
    let whereCondition = "";
    if (andConditions.length > 0) {
      whereCondition = `WHERE ${andConditions.join(" AND ")}`;
    }
    let command = `UPDATE ${table} SET ${updatedFields.join(
      ", "
    )} ${whereCondition}`;
    this.client.query(command, callback);
  }

  delete({ table = "", andConditions = [] } = {}, callback) {
    let whereCondition = "";
    if (andConditions.length > 0) {
      whereCondition = `WHERE ${andConditions.join(" AND ")}`;
    }
    let command = `DELETE FROM ${table} ${whereCondition}`;
    this.client.query(command, callback);
  }
}

module.exports = AccessDB;

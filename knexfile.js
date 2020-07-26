module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "./database/auth.db3" }, // change if you want a different name for the db
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: "./database/migrations",
      tableName: "dbmigrations",
    },
    seeds: { directory: "./database/seeds" },
  },
};

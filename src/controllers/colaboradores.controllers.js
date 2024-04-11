const pg = require("pg");
require("dotenv").config();
const getUsers = async (req, res) => {
  const client = new pg.Client({
    connectionString: process.env.POSTGRES_URL || "",
  });

  try {
    await client.connect();
    const result = await client.query("SELECT * from Admin.colaboradores");
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error running query", error);
    res.status(500).json({ error: error.message });
  } finally {
    await client.end();
  }

};
module.exports = { getUsers};

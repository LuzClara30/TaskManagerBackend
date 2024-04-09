const {Pool} = require('pg');
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL ,
  });
  const getUsers = async (req, res) => {
    try {
        const client = await pool.connect();
        // Lógica para obtener usuarios...
        res.send('Users!');
        client.release(); // Liberar cliente después de su uso
    } catch (error) {
        console.error('Error getting users from database:', error);
        res.status(500).send('Error getting users from database');
    }
}

module.exports = { getUsers };

const { sql } = require('@vercel/postgres');

const getUsers = async (req, res) => {
  try {
    // Ejecutar la consulta SQL para seleccionar todos los datos de la tabla 'colaboradores'
    const result = await sql`SELECT * FROM Admin.colaboradores;`;
    // Devolver los datos como respuesta en formato JSON
    return res.status(200).json(result);
  } catch (error) {
    // Si hay un error, devolver un código de estado 500 junto con el error
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers };
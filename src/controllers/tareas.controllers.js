const pg = require("pg");
require("dotenv").config();
//Obtener todas las tareas
const getAllTask = async (req, res) => {
  const client = new pg.Client({
    connectionString: process.env.POSTGRES_URL || "",
  });

  try {
    await client.connect();
    const result = await client.query("SELECT * from Admin.tareas");
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error running query", error);
    res.status(500).json({ error: error.message });
  } finally {
    await client.end();
  }
};
// Crear una tarea
const createTask = async (req, res) => {
  let {
    descripcion,
    colaborador_id,
    estado,
    prioridad,
    fecha_inicio,
    fecha_fin,
    notas,
  } = req.body;

  colaborador_id = colaborador_id || null;
  notas = notas || null;
  estado = estado || "PENDIENTE";
  const client = new pg.Client({
    connectionString: process.env.POSTGRES_URL || "",
  });

  try {
    await client.connect();
    const query =
      "INSERT INTO Admin.Tareas (descripcion, colaborador_id, estado, prioridad, fecha_inicio, fecha_fin, notas) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const values = [
      descripcion,
      colaborador_id,
      estado,
      prioridad,
      fecha_inicio,
      fecha_fin,
      notas,
    ];
    const result = await client.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating task", error);
    res.status(500).json({ error: error.message });
  } finally {
    await client.end();
  }
};
// Editar una tarea
const updateTask = async (req, res) => {
  console.log(req);
  const taskId = req.params.id;
  const {
    descripcion,
    colaborador_id,
    estado,
    prioridad,
    fecha_inicio,
    fecha_fin,
    notas,
  } = req.body;
  console.log(req.body);
  const client = new pg.Client({
    connectionString: process.env.POSTGRES_URL || "",
  });

  try {
    await client.connect();
    const query =
      "UPDATE Admin.Tareas SET descripcion = $1, colaborador_id = $2, estado = $3, prioridad = $4, fecha_inicio = $5, fecha_fin = $6, notas = $7 WHERE id = $8 RETURNING *";
    const values = [
      descripcion,
      colaborador_id,
      estado,
      prioridad,
      fecha_inicio,
      fecha_fin,
      notas,
      taskId,
    ];
    const result = await client.query(query, values);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating task", error);
    res.status(500).json({ error: error.message });
  } finally {
    await client.end();
  }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const client = new pg.Client({
    connectionString: process.env.POSTGRES_URL || "",
  });

  try {
    await client.connect();
    const query = "DELETE FROM Admin.Tareas WHERE id = $1 RETURNING *";
    const values = [taskId];
    const result = await client.query(query, values);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.status(200).json({ message: "Task deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting task", error);
    res.status(500).json({ error: error.message });
  } finally {
    await client.end();
  }
};

module.exports = { getAllTask, createTask, updateTask, deleteTask };

# TaskManagerBackend
# COLABORADORES.CONTROLLERS.JS
* endpoint getUsers pertenece al controlador colaboradores
Descripción: Obtener todos los colaboradores de la base de datos
Método HTTP: GET
Recibe: No recibe parametros
Retorna una lista que contiene un JSON con el siguiente formato(código estado 200):
[
  {
    "id": 1,
    "nombre": "Rocio Rojas Arguedas"
  },
  {
    "id": 2,
    "nombre": "Alonso Montero Rojas"
  }
]
Error del servidor (Código de estado 500):
Error:  retorna un Json con la siguiente estructura
{"error": "mensaje de error detectado"}

# TAREAS.CONTROLLERS.JS
* endpoint getAllTask
Descripción: Obtener todas las tareas de la base de datos
Método HTTP: GET
Recibe: No recibe parametros
Retorna una lista que contiene un JSON con el siguiente formato(código estado 200):
[
  {
    "id": 12,
    "descripcion": "tarea1",
    "colaborador_id": 1,
    "estado": "EN PROCESO",
    "prioridad": "Alta",
    "fecha_inicio": "2024-04-24T06:00:00.000Z",
    "fecha_fin": "2024-04-25T06:00:00.000Z",
    "notas": null
  },
  {
    "id": 1,
    "descripcion": "tarea1",
    "colaborador_id": null,
    "estado": "EN PROCESO",
    "prioridad": "Alta",
    "fecha_inicio": "2024-04-24T06:00:00.000Z",
    "fecha_fin": "2024-04-25T06:00:00.000Z",
    "notas": null
  },
  ]
Error del servidor (Código de estado 500):
Error:  retorna un Json con la siguiente estructura
{"error": "mensaje de error detectado"}

* endpoint: createTask
Descripción: Crear tareas en la base de datos
Método HTTP: POST
Recibe: Cuerpo de la solicitud formato(JSON):
el colaborador puede ir "" en ese caso se le asignará null
o puede llevar un int que coincida con el id de un colaborador
en el caso de notas tambien puede ir "" y se le asignará null
{
    "descripcion": "tarea prueba",
    "colaborador_id": "",
    "estado": "PENDIENTE",
    "prioridad": "Alta",
    "fecha_inicio": "2024-04-24T06:00:00.000Z",
    "fecha_fin": "2024-04-25T06:00:00.000Z",
    "notas": "realizar lo más pronto"
  }
Retorna un JSON con el siguiente formato(Código de estado 200):
{
  "id": 16,
  "descripcion": "tarea prueba",
  "colaborador_id": null,
  "estado": "PENDIENTE",
  "prioridad": "Alta",
  "fecha_inicio": "2024-04-24T06:00:00.000Z",
  "fecha_fin": "2024-04-25T06:00:00.000Z",
  "notas": "realizar lo más pronto"
}
Error del servidor (Código de estado 500):
Error: retorna un JSON con la siguiente estructura
{"error": "mensaje de error detectado"}

* endpoint:updateTask
Descripción: Editar tareas en la base de datos
Método HTTP: PUT
Parámetros de URL:
'id' (obligatorio): ID de la tarea a actualizar
Recibe: Cuerpo de la solicitud formato(JSON):
{
    "descripcion": "tarea prueba",
    "colaborador_id": "",
    "estado": "PENDIENTE",
    "prioridad": "Alta",
    "fecha_inicio": "2024-04-24T06:00:00.000Z",
    "fecha_fin": "2024-04-25T06:00:00.000Z",
    "notas": "realizar lo más pronto"
}
Retorna un JSON con el siguiente formato(Código de estado 200):
{
  "id": 16,
  "descripcion": "tarea prueba",
  "colaborador_id": null,
  "estado": "PENDIENTE",
  "prioridad": "Alta",
  "fecha_inicio": "2024-04-24T06:00:00.000Z",
  "fecha_fin": "2024-04-25T06:00:00.000Z",
  "notas": "realizar lo más pronto"
}
Error del servidor (Código de estado 500):
{
  "error": "string"
}

* endpoint:deleteTask
Descripción: Eliminar tareas en la base de datos
Método HTTP: DELETE
Parámetros de URL:
'id' (obligatorio): ID de la tarea a eliminar
No Recibe: Cuerpo de la solicitud en formato(JSON)
Éxito (Código de estado 200):
{
  "message": "Task deleted successfully"
}
No encontrado (Código de estado 404):
{
  "message": "Task not found"
}
Error del servidor (Código de estado 500):
{
  "error": "string"
}



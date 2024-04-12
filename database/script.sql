--Creación de la base de datos en POSTGRESQL
CREATE DATABASE NCQTest;
--Creación del Schema
CREATE SCHEMA Admin;
--Creación de la tabla colaboradores
CREATE TABLE IF NOT EXISTS Admin.Colaboradores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);
--Creación de la tabla tareas
CREATE TABLE IF NOT EXISTS Admin.Tareas (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    colaborador_id INT REFERENCES Admin.Colaboradores(id),
    estado VARCHAR(20) DEFAULT 'PENDIENTE' CHECK (estado IN ('PENDIENTE', 'EN PROCESO', 'FINALIZADA')),
    prioridad VARCHAR(10),
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    notas TEXT
);
--Creación de un FUNCIÓN para verificar el estado de la tarea y así evitar que el usuario pueda agregar
-- tareas en estado 'EN PROCESO' o 'FINALIZADA' sin seleccionar un colaborador.
CREATE OR REPLACE FUNCTION Admin.verificar_colaborador() 
RETURNS TRIGGER AS $$
BEGIN
    -- Verificar si el estado es 'EN PROCESO' o 'FINALIZADA'
    IF NEW.estado IN ('EN PROCESO', 'FINALIZADA') THEN
        -- Verificar si no hay un colaborador asignado
        IF NEW.colaborador_id IS NULL THEN
            RAISE EXCEPTION 'Debe asignar un colaborador para una tarea en estado "EN PROCESO" o "FINALIZADA"';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--Creación del trigger 
CREATE TRIGGER tarea_verificar_colaborador
--Se activará antes de que se realice una inserción o una actualización en la tabla Tareas 
BEFORE INSERT OR UPDATE ON Admin.Tareas
FOR EACH ROW --por cada fila afectada por la operación
--Función a ejecutar cuando el trigger sea activado
EXECUTE FUNCTION Admin.verificar_colaborador();

--Crear función para verificar que al editar una tarea no se encuentre en estado 'FINALIZADA' y que al 'ELIMINAR'
--No se encuentre en estado 'EN PROCESO'
CREATE OR REPLACE FUNCTION Admin.verificar_edicion_eliminacion_tareas()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        IF OLD.estado = 'FINALIZADA' THEN
            RAISE EXCEPTION 'No se permite editar tareas finalizadas';
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.estado = 'EN PROCESO' THEN
            RAISE EXCEPTION 'No se puede eliminar una tarea en proceso, primero cambie el estado de la tarea';
		ELSE
		return OLD;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--Cereación del trigger 
CREATE TRIGGER tarea_verificar_edicion_eliminacion
--Se activará antes de que se realice una Eliminación o una actualización en la tabla Tareas 
BEFORE UPDATE OR DELETE ON Admin.Tareas
FOR EACH ROW--por cada fila afectada por la operación
--Función a ejecutar cuando el trigger sea activado
EXECUTE FUNCTION Admin.verificar_edicion_eliminacion_tareas();

--INSERCIONES EN LAS TABLAS CREADAS
select * from Admin.colaboradores;
INSERT INTO Admin.colaboradores(nombre)
	VALUES ('Rocio Rojas Arguedas');
INSERT INTO Admin.colaboradores(nombre)
	VALUES ('Alejandro Mora Muñoz');
--Inserción 'EN PROCESO'
INSERT INTO Admin.tareas(descripcion, colaborador_id, estado, prioridad, fecha_inicio, fecha_fin, notas)
	VALUES ('realizar test ', 1, 'EN PROCESO','alta', '2024-04-08', '2024-04-09', 'realizar con compañia externa');
--Inserción sin colaborador
INSERT INTO Admin.tareas(descripcion, estado, prioridad, fecha_inicio, fecha_fin, notas)
	VALUES ('realizar test', 'PENDIENTE','alta', '2024-04-08', '2024-04-09', 'realizar con compañia externa');
--Inserción 'FINALIZADA'
INSERT INTO Admin.tareas(descripcion, colaborador_id, estado, prioridad, fecha_inicio, fecha_fin, notas)
	VALUES ('realizar test2 ', 2, 'FINALIZADA','alta', '2024-04-13', '2024-04-15', 'realizar con compañia externa');
--Inserción 'PENDIENTE'
INSERT INTO Admin.tareas(descripcion, colaborador_id, estado, prioridad, fecha_inicio, fecha_fin, notas)
	VALUES ('realizar test2 ', 2, 'PENDIENTE','alta', '2024-04-10', '2024-04-15', 'realizar con compañia externa');
select * from  Admin.tareas
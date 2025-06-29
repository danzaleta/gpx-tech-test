// src/controllers/person.controller.ts
import { Request, Response, NextFunction } from 'express';

// Definimos el tipo de dato para una Persona
export interface Person {
    id: number;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    direccion: string;
    telefono: string;
}

// Simulación de base de datos en memoria
let people: Person[] = [
    {
        id: 1,
        nombres: 'Juan',
        apellidoPaterno: 'Pérez',
        apellidoMaterno: 'García',
        direccion: 'Calle Falsa 123',
        telefono: '5512345678'
    },
    {
        id: 2,
        nombres: 'Ana María',
        apellidoPaterno: 'Gómez',
        apellidoMaterno: 'López',
        direccion: 'Avenida Siempre Viva 742',
        telefono: '5587654321'
    }
];
let currentId = 3;

// Obtener todas las personas
export const getPeople = (req: Request, res: Response, next: NextFunction): void => {
    try {
        res.json(people);
        console.log("[GET] getPeople");
    } catch (error) {
        next(error);
    }
};

// Crear una nueva persona
export const createPerson = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const { nombres, apellidoPaterno, apellidoMaterno, direccion, telefono } = req.body;

        // Validación básica
        if (!nombres || !apellidoPaterno || !apellidoMaterno || !direccion || !telefono) {
            res.status(400).json({ message: 'Todos los campos son requeridos' });
            return;
        }

        const newPerson: Person = {
            id: currentId++,
            nombres,
            apellidoPaterno,
            apellidoMaterno,
            direccion,
            telefono
        };

        people.push(newPerson);
        res.status(201).json(newPerson);
        console.log("[POST] createPerson");
    } catch (error) {
        next(error);
    }
};

// Actualizar una persona
export const updatePerson = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const { id } = req.params;
        const personIndex = people.findIndex(p => p.id === parseInt(id));

        if (personIndex === -1) {
            res.status(404).json({ message: 'Persona no encontrada' });
            return;
        }

        const { nombres, apellidoPaterno, apellidoMaterno, direccion, telefono } = req.body;

        // Validación básica
        if (!nombres || !apellidoPaterno || !apellidoMaterno || !direccion || !telefono) {
            res.status(400).json({ message: 'Todos los campos son requeridos' });
            return;
        }

        people[personIndex] = {
            ...people[personIndex],
            nombres,
            apellidoPaterno,
            apellidoMaterno,
            direccion,
            telefono
        };

        res.json(people[personIndex]);
        console.log("[PUT] updatePerson");
    } catch (error) {
        next(error);
    }
};

// Eliminar una persona
export const deletePerson = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const { id } = req.params;
        const initialLength = people.length;
        people = people.filter(p => p.id !== parseInt(id));

        if (people.length === initialLength) {
            res.status(404).json({ message: 'Persona no encontrada' });
            return;
        }

        res.status(204).send(); // 204 No Content
        console.log("[DELETE] deletePerson");
    } catch (error) {
        next(error);
    }
};
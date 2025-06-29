// src/controllers/person.controller.ts
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

// Obtener todas las personas
export const getPeople = async (req: Request, res: Response) => {
    try {
        const people = await prisma.person.findMany();
        res.json(people);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las personas', error });
    }
};

export const createPerson = async (req: Request, res: Response) => {
    try {
        const newPerson = await prisma.person.create({
            data: req.body,
        });
        res.status(201).json(newPerson);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la persona', error });
    }
};

export const updatePerson = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedPerson = await prisma.person.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(updatedPerson);
    } catch (error) {
        // Prisma arroja un error específico si no encuentra el registro a actualizar
        res.status(404).json({ message: 'Persona no encontrada o error al actualizar', error });
    }
};

export const deletePerson = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.person.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send(); // 204 No Content
    } catch (error) {
        // Prisma arroja un error específico si no encuentra el registro a eliminar
        res.status(404).json({ message: 'Persona no encontrada o error al eliminar', error });
    }
};
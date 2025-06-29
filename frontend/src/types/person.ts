// src/types/person.ts
export interface Person {
    id?: number; // El ID es opcional porque al crear una nueva persona, no lo tendremos aún.
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    direccion: string;
    telefono: string;
}
// src/components/PersonTable.tsx
import React from 'react';
import { Person } from '../types/person';

interface Props {
    people: Person[];
    onEdit: (person: Person) => void;
    onDelete: (id: number) => void;
}

const PersonTable: React.FC<Props> = ({ people, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre(s)</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {people.length > 0 ? (
                    people.map((person) => (
                        <tr key={person.id}>
                            <td>{person.nombres}</td>
                            <td>{person.apellidoPaterno}</td>
                            <td>{person.apellidoMaterno}</td>
                            <td>{person.direccion}</td>
                            <td>{person.telefono}</td>
                            <td>
                                <button onClick={() => onEdit(person)}>Editar</button>
                                <button onClick={() => onDelete(person.id!)}>Eliminar</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6}>No hay personas registradas.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default PersonTable;
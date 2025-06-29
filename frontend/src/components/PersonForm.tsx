import React, { useState, useEffect } from 'react';
import { Person } from '../types/person';

interface Props {
    onSave: (person: Person) => void;
    onClose: () => void;
    personToEdit: Person | null;
}

const initialFormState: Person = {
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    direccion: '',
    telefono: '',
};

const PersonForm: React.FC<Props> = ({ onSave, onClose, personToEdit }) => {
    const [formState, setFormState] = useState<Person>(initialFormState);

    useEffect(() => {
        if (personToEdit) {
            setFormState(personToEdit);
        } else {
            setFormState(initialFormState);
        }
    }, [personToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formState);
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>{personToEdit ? 'Editar Persona' : 'Registrar Persona'}</h2>
                <form onSubmit={handleSubmit}>
                    <input name="nombres" value={formState.nombres} onChange={handleChange} placeholder="Nombre(s)" required />
                    <input name="apellidoPaterno" value={formState.apellidoPaterno} onChange={handleChange} placeholder="Apellido Paterno" required />
                    <input name="apellidoMaterno" value={formState.apellidoMaterno} onChange={handleChange} placeholder="Apellido Materno" required />
                    <input name="direccion" value={formState.direccion} onChange={handleChange} placeholder="Dirección" required />
                    <input name="telefono" value={formState.telefono} onChange={handleChange} placeholder="Teléfono" required />
                    <div className="form-actions">
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PersonForm;
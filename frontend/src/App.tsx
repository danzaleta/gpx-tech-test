import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { Person } from './types/person';
import * as personService from './services/personService';
import PersonTable from './components/PersonTable';
import PersonForm from './components/PersonForm';

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [personToEdit, setPersonToEdit] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    const data = await personService.getPeople();
    setPeople(data);
    setIsLoading(false);
  };

  const filteredPeople = useMemo(() =>
    people.filter(person =>
      person.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.apellidoPaterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.apellidoMaterno.toLowerCase().includes(searchTerm.toLowerCase())
    ), [people, searchTerm]
  );

  const handleOpenForm = (person: Person | null = null) => {
    setPersonToEdit(person);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setPersonToEdit(null);
  };

  const handleSavePerson = async (person: Person) => {
    if (person.id) {
      await personService.updatePerson(person.id, person);
    } else {
      await personService.createPerson(person);
    }
    fetchPeople();
    handleCloseForm();
  };

  const handleDeletePerson = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar a esta persona?')) {
      await personService.deletePerson(id);
      fetchPeople();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Personas</h1>
      </header>
      <main>
        <div className="toolbar">
          <input
            type="text"
            placeholder="Buscar por nombre o apellido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={() => handleOpenForm()}>Registrar Nueva Persona</button>
        </div>

        <PersonTable
          people={filteredPeople}
          onEdit={handleOpenForm}
          onDelete={handleDeletePerson}
          isLoading={isLoading}
        />

        {isFormOpen && (
          <PersonForm
            onSave={handleSavePerson}
            onClose={handleCloseForm}
            personToEdit={personToEdit}
          />
        )}
      </main>
    </div>
  );
}

export default App;
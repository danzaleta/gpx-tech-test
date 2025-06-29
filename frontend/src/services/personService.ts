// src/services/personService.ts
import axios from 'axios';
import { Person } from '../types/person';

const API_URL = 'http://localhost:4000/api/persons';

export const getPeople = async (): Promise<Person[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createPerson = async (person: Person): Promise<Person> => {
    const response = await axios.post(API_URL, person);
    return response.data;
};

export const updatePerson = async (id: number, person: Person): Promise<Person> => {
    const response = await axios.put(`${API_URL}/${id}`, person);
    return response.data;
};

export const deletePerson = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
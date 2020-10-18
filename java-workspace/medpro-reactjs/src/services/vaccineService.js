
import {API_VACCINE, API_VACCINE_SEARCH} from '../Config';

import {fetchAll, fetchById, searchByName, create, deleteById,update} from './api.js';

const API = API_VACCINE;
const API_SEARCH = API_VACCINE_SEARCH;

export const fetchVaccines = async (pid)  => await fetchAll (API + '/?pid=' + pid);

export const fetchVaccineById = async (id) => await fetchById(id, API);

export const  searchVaccine = async (name, pagination) => 
        await searchByName(name, pagination, API_SEARCH);

export const  createVaccine = async (vaccine) => await create(vaccine, API);              

export const  deleteVaccine = async (id) => await  deleteById(id, API);              

export const  updateVaccine = async (vaccine) => await update(vaccine, API);              











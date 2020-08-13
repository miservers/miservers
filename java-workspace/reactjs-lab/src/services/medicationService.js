
import {API_MEDICATION, API_MEDICATION_SEARCH} from '../Config';

import {fetchAll, fetchById, searchByName, create, deleteById,update} from './api.js';

const API = API_MEDICATION;
const API_SEARCH = API_MEDICATION_SEARCH;

export const fetchMedications = async (pid)  => await fetchAll (API + '/?pid=' + pid);

export const fetchMedicationById = async (id) => await fetchById(id, API);

export const  searchMedication = async (name, pagination) => 
        await searchByName(name, pagination, API_SEARCH);

export const  createMedication = async (medication) => await create(medication, API);              

export const  deleteMedication = async (id) => await  deleteById(id, API);              

export const  updateMedication = async (medication) => await update(medication, API);              












import {API_ALLERGY, API_ALLERGY_SEARCH} from '../Config';

import {fetchAll, fetchById, searchByName, create, deleteById,update} from './api.js';

const API = API_ALLERGY;
const API_SEARCH = API_ALLERGY_SEARCH;

export const fetchAllergies = async (pid)  => await fetchAll (API + '/?pid=' + pid);

export const fetchAllergyById = async (id) => await fetchById(id, API);

export const  searchAllergy = async (name, pagination) => 
       await searchByName(name, pagination, API_SEARCH);

export const  createAllergy = async (allergy) => await create(allergy, API);              

export const  deleteAllergy = async (id) => await  deleteById(id, API);              

export const  updateAllergy = async (allergy) => await update(allergy, API);              











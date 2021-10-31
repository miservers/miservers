
import {API_BIOMETRIC, API_BIOMETRIC_SEARCH} from '../Config';

import {fetchAll, fetchById, searchByName, create, deleteById,update} from './api.js';

const API = API_BIOMETRIC;
const API_SEARCH = API_BIOMETRIC_SEARCH;

export const fetchBiometrics = async (pid)  => await fetchAll (API + '/?pid=' + pid);

export const fetchBiometricById = async (id) => await fetchById(id, API);

export const  fetchLastMeasureByName = async (pid, measureName) => 
       await fetchAll(API+'/'+pid+'/last/'+measureName);

export const  searchBiometric = async (name, pagination) => 
       await searchByName(name, pagination, API_SEARCH);

export const  createBiometric = async (biometric) => await create(biometric, API);              

export const  deleteBiometric = async (id) => await  deleteById(id, API);              

export const  updateBiometric = async (biometric) => await update(biometric, API);              











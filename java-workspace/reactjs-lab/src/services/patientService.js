
import {API_PATIENT, API_PATIENT_SEARCH} from '../Config';

import {fetchAll, fetchByPage, fetchById, searchByName, create, deleteById} from './api.js';

async function fetchPatients (pagination) {
        
    return fetchByPage (pagination, API_PATIENT);

};

async function fetchPatientById (pid) {

    return fetchById(pid, API_PATIENT);
};


async function  searchPatient (name, pagination) {
  
  return searchByName(name, pagination, API_PATIENT_SEARCH);
}


async function  createPatient (patient) {

  return create(patient, API_PATIENT);              

}


// EXPORTS

export {fetchPatients, searchPatient, fetchPatientById, createPatient};











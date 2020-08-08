
import {API_PATIENT, API_PATIENT_SEARCH} from '../Config';

import {fetchByPage, fetchById, searchByName, create} from './api.js';

const API = API_PATIENT;
const API_SEARCH = API_PATIENT_SEARCH;

export const fetchPatients = async (pagination) => fetchByPage (pagination, API);

export const fetchPatientById = async (pid) => fetchById(pid, API);

export const searchPatient = async (name, pagination) => searchByName(name, pagination, API_SEARCH);

export const  createPatient = async (patient) => create(patient, API);              







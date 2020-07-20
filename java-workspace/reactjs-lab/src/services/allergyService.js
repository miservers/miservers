
import {API_ALLERGY, API_ALLERGY_SEARCH} from '../Config';

import {fetchAll, fetchById, searchByName, create, deleteById,update} from './api.js';

async function fetchAllergies (pid) {
    let url = API_ALLERGY + '/?pid=' + pid;
    return fetchAll (url);
};

async function fetchAllergyById (id) {

    return fetchById(id, API_ALLERGY);
};


async function  searchAllergy (name, pagination) {
  
  return searchByName(name, pagination, API_ALLERGY_SEARCH);
}


async function  createAllergy (allergy) {

  return create(allergy, API_ALLERGY);              

}

async function  deleteAllergy (id) {

  return  deleteById(id, API_ALLERGY);              

}

async function  updateAllergy (allergy) {

  return  update(allergy, API_ALLERGY);              

}

// EXPORTS

export {fetchAllergies, searchAllergy, fetchAllergyById, createAllergy, deleteAllergy, updateAllergy};











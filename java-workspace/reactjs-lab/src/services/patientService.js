
import {API_PATIENT, API_PATIENT_SEARCH} from '../Config';

const headers = new Headers({
  "Accept": "application/json, text/plain",
  "Content-Type": "application/json",
});

const handleErrors = async (response) => {
  console.log(response);
  if (response.ok)
    return response;
  else 
    throw new Error(response.status + '. ' + response.statusText);
}
  
const _fetchFrom  = async (url) => {
let data = await fetch(url,
                       {method: 'GET',
                        headers: headers,
                        mode: 'cors',
                       })
                 .then (handleErrors)
                 .then (response => response.json())
                 .catch(err => {throw new Error(err)});
  return data;
}

async function fetchPatients (pagination) {
        
    let url = API_PATIENT;
    
    url += '?pageNo=' + (pagination.current-1) +
           '&pageSize=' + pagination.pageSize;
      
    if (pagination.orderBy)
      url += '&sortBy=' + pagination.orderBy.field +
             '&sortDirection=' + pagination.orderBy.orderDirection;
  
    if(pagination.search) 
      url += '&criteria=' + pagination.search;
        
    console.log(url);
    
    let data = _fetchFrom (url);
    
    return data;
};

async function fetchPatientById (id) {
        
    let url = API_PATIENT + '/' + id;
            
    console.log(url);
    
    let data = _fetchFrom (url);

    return data;
};


async function  searchPatient (name, pagination) {
  let url = API_PATIENT_SEARCH;
  
  url += '?pageNo=' + (pagination.current-1) +
           '&pageSize=' + pagination.pageSize;
     
  url += '&name=' + name;
      
  console.log(url);
  
  let data = _fetchFrom (url);
  
  return data;
}


async function  createPatient (patient) {
  let url = API_PATIENT;
  
  console.log(url);
  console.log("Patient to be created :");console.log(JSON.stringify(patient));
  
  let data  = await fetch(url,
                          {method: 'POST',
                           headers: headers,
                           mode: 'cors',
                           body: JSON.stringify(patient),
                    })
                   .then(handleErrors)
                   .then (response => response.json())
                   .catch(err => {throw new Error(err)});
  return data;              
}


// EXPORTS

export {fetchPatients, searchPatient, fetchPatientById, createPatient};











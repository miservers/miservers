
import {API_PATIENT, API_PATIENT_SEARCH} from '../Config';

const headers = new Headers({
  "Accept": "application/json, text/plain",
  "Content-Type": "application/json",
});

export async function  fetchPatients (pagination)  {
        
    let url = API_PATIENT;
    
    url += '?pageNo=' + (pagination.current-1) +
           '&pageSize=' + pagination.pageSize;
      
    if (pagination.orderBy)
      url += '&sortBy=' + pagination.orderBy.field +
             '&sortDirection=' + pagination.orderBy.orderDirection;
  
    if(pagination.search) 
      url += '&criteria=' + pagination.search;
        
    console.log(url);
    
    const response = await fetch(url,
                                 {method: 'GET',
                                  headers: headers,
                                  mode: 'cors',
                                 });
    const data     = await response.json();

    return data;
}

export async function  searchPatient (criteria, pagination)  {
  let url = API_PATIENT_SEARCH;
  
  url += '?pageNo=' + (pagination.current-1) +
           '&pageSize=' + pagination.pageSize;
     
  url += '&criteria=' + criteria;
      
  console.log(url);
  
  const response = await fetch(url,
                               {method: 'GET',
                                headers: headers,
                                mode: 'cors',
                               });
  const data     = await response.json();
  
  return data;
}



export  async function  createPatient (patient)  {
  let url = API_PATIENT;
  
  console.log(url);
  console.log("Patient to be created :");console.log(JSON.stringify(patient));
  
  const response =  await fetch(url,
                                {method: 'POST',
                                 headers: headers,
                                 mode: 'cors',
                                 body: JSON.stringify(patient),
                                });
                    
  const data = await response.json();             
  
  if (response.ok) {
    const newPatient = data;
    console.log("Patient cree avec ID "+newPatient.id);
  }
  else {
    console.log('failed to create patient: status='+response.status+
                  ', message='+data.message);
  }
  
  return data;
}
















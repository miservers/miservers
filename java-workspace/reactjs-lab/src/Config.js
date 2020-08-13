const server = {
  host:'localhost', //192.168.43.11
  port:8080,
};

const API_URL = 'http://'+server.host+':'+server.port+'/api';

export const API_PATIENT        = API_URL + '/patients';
export const API_PATIENT_SEARCH = API_PATIENT + '/search'; 
export const API_PATIENT_RECORD = API_PATIENT + '/record/'; 

export const API_ALLERGY        = API_URL + '/allergies';
export const API_ALLERGY_SEARCH = API_ALLERGY + '/search'; 

export const API_MEDICATION        = API_URL + '/medications';
export const API_MEDICATION_SEARCH = API_MEDICATION + '/search'; 

export const API_VACCINE        = API_URL + '/vaccines';
export const API_VACCINE_SEARCH = API_VACCINE + '/search'; 

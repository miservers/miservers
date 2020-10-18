import { Table, Space, notification,Popconfirm } from 'antd';
import {HttpStatus} from '../constants';

const headers = new Headers({
  "Accept": "application/json, text/plain",
  "Content-Type": "application/json",
});

const handleErrors = async (response) => {
  console.log(response);
  switch (response.status) {
    case HttpStatus.OK: 
                        return response;
    case HttpStatus.NO_CONTENT: 
                        return response;
    case HttpStatus.NOT_FOUND: 
                        return null;
    default: 
                        throw new Error('Backend Server Error: '+response.status + '. ' + response.statusText);
  }
}
  
const _fetch  = async (url, method, data) => {
  
  console.log(url);
  if(method == 'POST' || method == 'PUT' )
    console.log(JSON.stringify(data));
  
  let result = await fetch(url,
                         {method: method,
                          headers: headers,
                          mode: 'cors',
                          body: data?JSON.stringify(data):null,
                         })
                   .then (response => {
                            console.log(response);
                            switch (response.status) {
                              case HttpStatus.OK: 
                              case HttpStatus.CREATED: 
                                                  return response.json();
                              case HttpStatus.NO_CONTENT: 
                              case HttpStatus.NOT_FOUND: 
                                                  return null;
                              default: 
                                      let err = 'Server Error: '+response.status + '. ' + response.statusText;
                                      throw new Error(err);
                            }
                          })
                   .catch(err => 
                          notification.error({
                            message: err.message,
                            placement: 'topLeft',
                          })); 
   return result;
}

const _get = async (url) =>  await _fetch(url, 'GET', null);

const _post = async (url, data) =>  await _fetch(url, 'POST', data);

const _delete = async (url) =>  await _fetch(url, 'DELETE');

const _put = async (url, data) =>  await _fetch(url, 'PUT', data);

async function fetchAll (api) {
                   
    let data = _get (api);
    
    return data;
};

async function fetchByPage (pagination, api) {
        
    let url = api;
    
    url += '?pageNo=' + (pagination.current-1) +
           '&pageSize=' + pagination.pageSize;
      
    if (pagination.orderBy)
      url += '&sortBy=' + pagination.orderBy.field +
             '&sortDirection=' + pagination.orderBy.orderDirection;
        
    let data = _get (url);
    
    return data;
};

async function fetchById (id, api) {
        
    let url = api + '/' + id;
                
    let data = _get (url);

    return data;
};


async function  searchByName (name, pagination, api) {
  let url = api;
  
  url += '?pageNo=' + (pagination.current-1) +
           '&pageSize=' + pagination.pageSize;
     
  url += '&name=' + name;
  
  let data = _get (url);
  
  return data;
}

/* Post(CREATE) data to the server. 
 * * URL=api , method POSTE, body:data
 */
async function  create (data, api) {
   let result  = await _post(api, data)
  return result;              
}

async function  update (data, api) {
   let result  = await _put(api, data)
  return result;              
}

/* DELETE a record on the remote server. 
 * id: record id to be deleted.
 * URL=api/id , method DELETE
 */
async function  deleteById (id, api) {
  
  let url = api + '/' + id;
  
  let result  = await _delete(url); 

  return result;              
}

// EXPORTS

export {fetchAll, fetchByPage, fetchById, searchByName, create, deleteById, update};











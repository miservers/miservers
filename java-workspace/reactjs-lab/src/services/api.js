
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


async function fetchAll (api) {
        
    let url = api;
               
    let data = _fetchFrom (url);
    
    return data;
};

async function fetchByPage (pagination, api) {
        
    let url = api;
    
    url += '?pageNo=' + (pagination.current-1) +
           '&pageSize=' + pagination.pageSize;
      
    if (pagination.orderBy)
      url += '&sortBy=' + pagination.orderBy.field +
             '&sortDirection=' + pagination.orderBy.orderDirection;
        
    console.log(url);
    
    let data = _fetchFrom (url);
    
    return data;
};

async function fetchById (id, api) {
        
    let url = api + '/' + id;
            
    console.log(url);
    
    let data = _fetchFrom (url);

    return data;
};


async function  searchByName (name, pagination, api) {
  let url = api;
  
  url += '?pageNo=' + (pagination.current-1) +
           '&pageSize=' + pagination.pageSize;
     
  url += '&name=' + name;
      
  console.log(url);
  
  let data = _fetchFrom (url);
  
  return data;
}

/* Post(CREATE) data to the server. 
 * * URL=api , method POSTE, body:data
 */
async function  create (data, api) {
  let url = api;
  console.log(url);
  console.log("Data to be created :");console.log(JSON.stringify(data));
  
  let result  = await fetch(url,
                            {method: 'POST',
                             headers: headers,
                             mode: 'cors',
                             body: JSON.stringify(data),
                      })
                     .then(handleErrors)
                     .then (response => response.json())
                     .catch(err => {throw new Error(err)});
  return result;              
}


/* DELETE a record on the remote server. 
 * id: record id to be deleted.
 * URL=api/id , method DELETE
 */
async function  deleteById (id, api) {
  let url = api + '/' + id;
  console.log(url);
  console.log("ID to be deleted :" + id);
  
  let result  = await fetch(url,
                            {method: 'DELETE',
                             headers: headers,
                             mode: 'cors',
                      })
                     .then(handleErrors)
                     .then (response => response.json())
                     .catch(err => {throw new Error(err)});
  return result;              
}

// EXPORTS

export {fetchAll, fetchByPage, fetchById, searchByName, create, deleteById};











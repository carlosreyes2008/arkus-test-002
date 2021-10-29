import * as HTTP from './http';

export const List = async () => {
    let endpoint = `api/listContacts.php`;
    
    let data = HTTP.GET(endpoint);
  
    return data;
}

export const Create = async (_data) => {
  let endpoint = `api/createContact.php`;
  
  let data = HTTP.POST(endpoint,_data);

  return data;
}

export const Update = async (_data) => {
  let endpoint = `api/updateContact.php`;
  
  let data = HTTP.POST(endpoint,_data);

  return data;
}

export const Delete = async (_data) => {
  let endpoint = `api/deleteContact.php`;
  
  let data = HTTP.POST(endpoint,_data);

  return data;
}
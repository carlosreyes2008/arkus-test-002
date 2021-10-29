const GET = async (endpoint) => {
    let requestEndpoint = endpoint;
  
    console.log(`${requestEndpoint}`);
  
    let response = await fetch(`${requestEndpoint}`);
    
    return response.json();
  }
  
  const POST = async (endpoint, postData) => {
    let url = `${endpoint}`;
  
    const response = await fetch(url, {
      method: 'POST',
      body: postData
    });
  
    return response.json();
  }
  
  export {GET, POST}
import { USER_API } from "../util/constant";

export const createUserAPI = async (payload) => {
  try {
    const res = await fetch(USER_API, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resJson = await res.json();
   
     return resJson;
    
  } 
  catch (error) {
    const resJson = await error.json();
  
    return resJson;
  }
};

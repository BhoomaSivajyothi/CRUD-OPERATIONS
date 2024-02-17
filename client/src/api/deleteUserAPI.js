import { USER_API } from "../util/constant";

export const deleteUserAPI =async (id)=>{
try{
    const res = await fetch(USER_API+`${id}`, {
        method: "DELETE",
  
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
      return data
}
catch (error){
    const err= await error.json();
    return err
}
}
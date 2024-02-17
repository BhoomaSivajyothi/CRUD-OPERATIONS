import React, { useEffect, useState } from "react";
import { createUserAPI } from "../api/createUserAPI";
import { getUserAPI } from "../api/getUserAPI";
import { updateUserAPI } from "../api/updateUserAPI";
import { deleteUserAPI } from "../api/deleteUserAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDispatch, useSelector,} from 'react-redux'
import { GeteditUseremail, GeteditUsername, Getemail, Getname, GetuserData, UpdateActiveuserid } from "../store/userSlice";


const Apidemo = () => {
  
  const  users= useSelector((state)=>state.users)
  const {name,email,userData,editUsername,editUseremail,activUserid}= users||{}
  const dispatch=useDispatch();

  const [isEdit, setisEdit] = useState(false);
 
  const deletedata = async (id) => {
    try{
      await deleteUserAPI(id)
      toast.success('user sucessfully deleted',{
        position: toast?.POSITION?.TOP_CENTER,
       })
       getdata();
    }
    catch(error){
      console.log(error)
      toast.error("Error Notification !", {
        position: toast?.POSITION?.TOP_CENTER,
      });
    }
    
  };

  //below methode is to postdata
  const postdata = async () => {
    try {
      const payload = {
        name: name,
        email: email,
      };
       await createUserAPI(payload);
      dispatch(Getemail(""));
      dispatch(Getname(""));
      getdata();
      toast.success('user sucessfully created',{
        position: toast?.POSITION?.TOP_CENTER,
       })
    } catch (error) {
      console.log(error);
      toast.error("Error Notification !", {
        position: toast?.POSITION?.TOP_CENTER,
      });
    }
  };

  //below methode is to getdata
  const getdata = async () => {
    try {
      const data = await getUserAPI();
      dispatch(GetuserData(data));
      toast.success('user sucessfully fetched',{
        position: toast?.POSITION?.TOP_CENTER,
       })
    } catch (error) {
      console.log(error);
      toast.error("Error Notification !", {
        position: toast?.POSITION?.TOP_CENTER,
      });
    }
  };

  //below methode is to update data
  const putdta = async () => {
    try {
      const payload = {
        name: editUsername,
        email: editUseremail,
      };
      await updateUserAPI(payload,activUserid);
      setisEdit(false);
      dispatch(UpdateActiveuserid(null));
      dispatch(GeteditUseremail(null));
      dispatch(GeteditUsername(null));
      getdata();
      toast.success('user sucessfully updated',{
        position: toast?.POSITION?.TOP_CENTER,
       })
    } catch (error) {
      console.log(error);
      toast.error("Error Notification !", {
        position: toast?.POSITION?.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    getdata();
  }, []);
  

  const handleedituser = (user) => {
    setisEdit(true);
    dispatch(UpdateActiveuserid(user.id));
    dispatch(GeteditUseremail(user.email));
    dispatch(GeteditUsername(user.name));
  };
console.log(userData)
  return (
    <>
      <div className="flex w-[100] justify-around border border-black p-10 rounded align-middle">
        <button
          className="border rounded bg-blue-600 text-white w-32"
          onClick={getdata}
        >
          GET
        </button>
        <button
          className="border rounded bg-orange-600 text-white w-32"
          onClick={putdta}
        >
          PUT
        </button>
        <button
          className="border rounded bg-green-600 text-white w-32"
          onClick={postdata}
        >
          POST
        </button>
        <button
          className="border rounded bg-red-600 text-white w-32"
          onClick={deletedata}
        >
          DELETE
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Entername"
          value={name}
          onChange={(e) => dispatch(Getname(e.target.value))}
        ></input>
        <input
          type="email"
          placeholder="Enteremail"
          value={email}
          onChange={(e) => dispatch(Getemail(e.target.value))}
        ></input>
        <button onClick={postdata}>Add</button>
      </div>
      <div className="flex w-[100] justify-around border-black p-10 rounded">
        <table className="m-10">
          <thead>
            <tr className="border border-black">
              <td className="border border-black">Name</td>
              <td className="border border-black">Email</td>
              <td className="border border-black">Edit</td>
              <td className="border border-black">Delete</td>
            </tr>
          </thead>
          <tbody>
            {userData?.map((user) => {
              return (
                <tr className="border border-black" key={user?.id}>
                  <td className="border border-black">{user?.name}</td>
                  <td className="border border-black">{user?.email}</td>
                  <td className="border border-black">
                    <button onClick={() => handleedituser(user)}>Edit</button>
                  </td>
                  <td className="border border-black">
                    <button onClick={() => deletedata(user?.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isEdit && (
          <div>
            <input
              type="text"
              placeholder="Entername"
              value={editUsername}
              onChange={(e) => dispatch(GeteditUsername(e.target.value))}
            ></input>
            <input
              type="email"
              placeholder="Enteremail"
              value={editUseremail}
              onChange={(e) => dispatch(GeteditUseremail(e.target.value))}
            ></input>
            <button onClick={putdta}>UPDATE</button>
          </div>
        )}
      </div>
      <ToastContainer/>
    </>
  );
};

export default Apidemo;

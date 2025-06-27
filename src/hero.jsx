import React from "react";
import { useState,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import Bottom from './bottom'


const hero = () => {
  const [eye, seteye] = useState(false);
const [text, settext] = useState('');
const [username, setusername] = useState('');
const [password, setpassword] = useState('');
const [show, setshow] = useState(false);
const [array, setarray] = useState(() => {
  const stored = localStorage.getItem("array");
  return stored ? JSON.parse(stored) : [];
});

const funct = async()=>{
    console.log(text,username,password)
const body = {
  text,
  username,
  password:Number(password)
}

const response = await fetch('http://localhost:8080/api/user',{
  method:'POST',
  headers:{
    "Content-Type": "application/json"
  },
  body:JSON.stringify(body)

})

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }
const data = await response.json()
console.log(data)
  }

let id

const handeltext = ()=>{


     id = uuidv4()
   if (username !== '' && password !== '' && text !== '') {
    
     const newitem = {uniqueid:id,text:text,username:username,password:password}
     setarray((prev)=>[...prev,newitem])
  

     setshow(true)
 setusername('')
 setpassword('')
 settext('')
 


}else{
  alert("Please fill these information!!")
}
}
useEffect(() => {
  localStorage.setItem("array",JSON.stringify(array))
    

}, [array]);

  const handeleye = () => {
    seteye(!eye);
    
   console.log(password.split(""))
  };
  return (
    <div >
      <div    className="top  top  md:w-[70%]  bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-3xl shadow-xl p-8 flex-col w-[80%] m-auto flex items-center justify-center mt-4">
        <div className="header  flex-col flex items-center justify-center">
          <div className="text-gray-800 font-extrabold text-3xl tracking-wide ">PASSOP</div>
          <div className="text-sm text-gray-600 mt-1">Your Own password manager</div>
        </div>

        <div className="inputs w-full flex-col flex items-center justify-center gap-6 mt-6">
          <input
            type="text"
            onChange={(e)=>settext(e.target.value)}
            value={text}
            className=" w-full md:w-4/5 px-4 py-2 rounded-full cursor-pointer border border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Website / URL"
            
          />
          <div  className="flex   w-full items-center justify-center gap-[2%] ">
            <input
              type="text"
              onChange={(e)=>setusername(e.target.value)}
              value={username}
              className="w-full md:w-2/3 px-4 py-2 cursor-pointer rounded-full border border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder=" username"
             
            />
            <div className="flex items-center justify-center  relative w-full md:w-1/3   rounded-full ">
              <input
                type={eye?"text" : "password"}
                onChange={(e)=>{setpassword(e.target.value)}}
                value={password}
                className="w-full px-5 py-2 rounded-full cursor-pointer border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white placeholder:text-gray-500"
                placeholder="Enter Password"
                id="pass"
              />
              <img
                src={eye ? "src/assets/eye.on.svg" : "src/assets/eyeOff.svg"}
                onClick={handeleye}
                className="absolute right-4 top-1/2  transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-purple-500"
                width={25}
                alt=""
              />
            </div>
          </div>
        </div>

        <button  onClick={()=>{
            handeltext()
          funct()
        }} className=" mb-5  px-6 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 mt-4">done</button>
      </div>
   <Bottom show={show} array={array} setusername={setusername} username={username} settext={settext} setpassword={setpassword} setarray={setarray}  setshow={setshow} />

    </div>
  );
};

export default hero;

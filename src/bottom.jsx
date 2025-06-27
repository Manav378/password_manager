import React from "react";

const bottom = ({
  show,
username,
  array,
  setarray,
  setpassword,
  settext,
  setusername,
}) => {
  const handeldelete = (id) => {

    const fil = array.filter((item) => item.uniqueid !== id);
    alert("Are you really want to delete this!!");
    setarray(fil);


  };


      const delet = async(username)=>{
    try {
  const fill = array.filter((item)=>item.username === username)

   const response = await fetch(`http://localhost:8080/api/user-delete/${fill[0].username}`,{
      method:'DELETE',
      headers: {
      "Content-Type": "application/json"
      }
    })

    const data =await  response.json()
    console.log(data)
} catch (error) {
     console.error("Error deleting user:", error);
}
   
  }

  const handelupdate = (id) => {
    const find = array.find((item) => item.uniqueid === id);
    setpassword(find.password);
    setusername(find.username);
    settext(find.text);
  };
  return (
    <div>
     <div className="w-full flex flex-col items-center justify-center mt-10">
         <h2 className="text-2xl font-bold mb-4 text-gray-700">🔐 Saved Passwords</h2>

        {array.length > 0 ? (
          <div className="w-[80%] mt-4 space-y-2">
            <div className="w-full flex items-center justify-center rounded-md overflow-hidden text-white bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 font-semibold">
              <div className="w-[60%] text-center py-2 border-r border-white">
                URL
              </div>
              <div className="w-[20%] text-center py-2 border-r border-white">
                username
              </div>
              <div className="w-[10%] text-center py-2 border-r border-white">
                password
              </div>
              <div className="w-[10%] text-center py-2">
                Action
              </div>
            </div>
            {array.map((item, index) => (
              <div key={index} className="w-full  ">
                <div className="w-full flex items-center justify-center bg-white rounded-md shadow-md overflow-hidden">
                  <div className="w-[60%] text-center py-2 px-2 border-r border-gray-300">
                    {item.text}
                  </div>
                  <div className="w-[20%] text-center py-2 px-2 border-r border-gray-300">
                    {item.username}
                  </div>
                  <div className="w-[10%] text-center py-2 px-2 border-r border-gray-300">
                    {item.password
                      .split("")
                      .map(() => "*")
                      .join("")}
                  </div>

                  <div className="w-[10%] flex items-center cursor-pointer justify-center gap-2 py-2 px-2">
                    <lord-icon
                      onClick={() => handelupdate(item.uniqueid)}
                      src="https://cdn.lordicon.com/exymduqj.json"
                      trigger="hover"
                    ></lord-icon>
                    <lord-icon
                      onClick={() =>{ handeldelete(item.uniqueid)
                               delet(item.username)
                              }
                      }
                      src="https://cdn.lordicon.com/jzinekkv.json"
                      trigger="morph"
                      stroke="bold"
                      state="morph-trash-in"
                      colors="primary:#000000,secondary:#08a88a"
                    ></lord-icon>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 mt-3">No password to show</div>
        )}
      </div>

    </div>
  );
};

export default bottom;

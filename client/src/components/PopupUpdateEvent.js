import React, { useContext, useEffect, useState } from "react";
import { Auth } from "../contexts/Auth";
import { UpdateForm } from "./UpdateForm";


export default function PopupUpdateEvent({showModal, setShowModal,setEvents,event }) {
  const { user } = useContext(Auth);
  const [users,setUsers] = useState([])
  const fetchAllUsers = async () => {
    const response = await fetch("/api/users", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const users = await response.json();
    setUsers(users);
  };
  useEffect(() => {
    fetchAllUsers()
  }, [])
  
 
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-2  max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex  p-2 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
                    Create a new Event
                  </h3>
                </div>
                {/*body*/}

                <div className="relative px-3 flex w-full ">
                  <UpdateForm users={users} setShowModal={setShowModal} setEvents={setEvents} event={event}/>
                </div>

                {/*footer*/}
               
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
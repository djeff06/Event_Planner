import React, { useContext } from "react";
import { Auth } from "../contexts/Auth";


export default function PopupModel({showModal, setShowModal,setEvents,event }) {
  const { user } = useContext(Auth);

  const fetchEvents = async (event) => {
    try {
      const response = await fetch(`/api/events/${event._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },

        body: JSON.stringify(event),
      });
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllEvents = async () => {
    try {
      const response = await fetch("/api/events", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const events = await response.json();
      setEvents(events);
    } catch (error) {
      console.log("get error", error)
    }
  };


  const handleDelete = (event) => {
    fetchEvents(event)
    fetchAllEvents()
    setShowModal(false)
   };
  
 
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-2  max-w-xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex  p-2 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Delete event Perminantly
                  </h3>
                </div>
                <div className="relative px-3 flex w-full justify-center items-center">
                  <p className="my-4  text-slate-500 text-lg leading-relaxed">
                    this action will delete your event perminantly, and you
                    wont be able to retrive it again
                  </p>
                </div>
                <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-emerald-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Non
                  </button>
                  <button
                    className="bg-red-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=>handleDelete(event)}
                  >
                    Delete!
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
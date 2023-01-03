import React, { useContext } from "react";
import { Auth } from "../contexts/Auth";
import { CreatEventForm } from "./CreatEventForm";


export default function PopupModel({showModal, setShowModal,setEvents }) {
  const { user } = useContext(Auth);

  const handelDeletDesign = async () => {
    await fetch({
     
    });
    //fetch and update global state with new list without the deleted product
 
    setShowModal(false);
  };
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
                  <CreatEventForm setShowModal={setShowModal}setEvents={setEvents}/>
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
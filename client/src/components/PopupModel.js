import React, { useContext, useEffect, useState } from "react";
import { Auth } from "../contexts/Auth";
import { CreatEventForm } from "./CreatEventForm";

export default function PopupModel({ showModal, setShowModal, setEvents }) {
  const { user } = useContext(Auth);
  const [users, setUsers] = useState([]);
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
    fetchAllUsers();
  }, []);

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-2  max-w-xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex  p-2 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
                    Create a new Event
                  </h3>
                </div>

                <div className="relative px-3 flex w-full ">
                  <CreatEventForm
                    users={users}
                    setShowModal={setShowModal}
                    setEvents={setEvents}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

import React, { useState, useEffect } from "react";
import { useFcmToken } from "../hooks/useFcmToken";

const Notification =  () => {
  const {retrieveMessage} = useFcmToken()
/* 
  const notif = await retrieveMessage()
  console.log("notif ", notif) */

  const [notification, setNotification] = useState({ title: "", body: "" });


  return (
    <>
      Hello : 
    </>
  );
};

export default Notification;

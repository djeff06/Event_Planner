import React, { useState } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export function UploadImage() {
  const [avatar, setAvatar] = useState("");

  // const removeImg = () => {};

  const uploadImg = async (e) => {
    // data for submit


    const image = e.target.files[0];
    const upImg = URL.createObjectURL(image);
    setAvatar(upImg);

    if (!image) {
      return null;
    }
    const newTitle = image.name.replaceAll(" ", "").toLowerCase();

    const response = await fetch(`api/uploadURL/${newTitle}`, {
      method: "GET",
    });
    const data = await response.json();
    const { put, get, key } = data;
    await axios.put(put, image);

    /*  try {
      await fetch(get, {
        method: "GET",
        body: JSON.stringify(image),
        
      });
    } catch (error) {
      console.log("error", error);
    }
     */
    // sendDAtaToDAtaBase(key);
  };

  return (
    <div className=" mb-10  text-center bg-slate-500 mb-4">
      <div className="flex justify-center items-center h-56 w-96">
        {avatar ? (
          <img className="h-56 w-96" src={avatar && avatar} alt=""></img>
        ) : (
          <AccountCircleIcon />
        )}
      </div>
      <div className="flex">
        <div
          as="label"
          htmlFor="inputImg"
          className={`flex justify-center items-center m-auto hover:scale-150 transition ease-in-out duration-300`}
        >
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/png" type="file" onChange={uploadImg} />
            UPLOAD <AddIcon />
          </IconButton>
        </div>
        <div
          as="label"
          htmlFor="inputImg"
          className={`flex justify-center items-center mx-auto my-5 hover:scale-150 transition ease-in-out duration-300`}
        >
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={() => {
              setAvatar("");
            }}
          >
            REMOVE <RemoveIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

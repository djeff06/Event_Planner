import React, { useContext } from "react";
import ImageUploading from "react-images-uploading";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Auth } from "../contexts/Auth";

export function UploadImage() {
  const [images, setImages] = React.useState([]);
  const [image, setImage] = React.useState([]);
  const maxNumber = 69;

  const user = useContext(Auth);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(addUpdateIndex);
    setImages(imageList);
    setImage(imageList[0]);
    console.log(image);
  };

  const handelSubmit = async () => {
    if (!image) {
      return null;
    }
    const newTitle = `${image.file.name
      .replaceAll(" ", "")
      .toLowerCase()}${uuidv4()}`;

    const response = await fetch(`api/uploadURL/${newTitle}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    const { put, get, key } = data;
    try {
      await fetch(put, {
        method: "PUT",
        body: JSON.stringify(image),
      });
    } catch (error) {
      console.log("error", error);
    }
    // sendDAtaToDAtaBase(key);
  };

  return (
    <div className="App h-10px border">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image["data_url"]} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                  <button onClick={() => handelSubmit()}>submit</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

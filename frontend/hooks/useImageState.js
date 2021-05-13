import { useState, useRef } from "react";
const { v4: uuidv4 } = require("uuid");
import Axios from "axios";

async function processFile() {
  try {
    let file = document.getElementById("fileInput").files[0];
    let contentBuffer = await readFileAsync(file);
    console.log(contentBuffer);
  } catch (err) {
    console.log(err);
  }
}

function useImageState(initialVal) {
  // Sets the initial state of the images, if no argument is passed, the default state will be an empty array
  const [images, setImages] = useState([]);
  //const [imagesPath, setImagesPath] = useState([]);
  const imagesPath = useRef();
  let newImages = [];
  const limitSizeImage = 2000000;
  // Handler when a image/images are loaded
  async function updateImages(e) {
    try {
      if (e.target.files) {
        const fileArray = Array.from(e.target.files);
        let readedImage = null;
        for (let i = 0; i < fileArray.length; ++i) {
          // validation to image input
          if (
            fileArray[i].type.substring(0, 5) === "image" &&
            fileArray[i].size <= limitSizeImage
          ) {
            let contentURL = await readFileAsync(fileArray[i]);
            newImages.push(contentURL);
          }
        }
        setImages([...images, ...newImages]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Async function for FileReader API taken from Simon Schrader at https://simon-schraeder.de/posts/filereader-async/
  function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      let readedImage = null;
      reader.onload = () => {
        resolve(
          (readedImage = {
            key: uuidv4(),
            url: reader.result,
            imageFile: file,
          })
        );
      };
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  }

  async function getPathImages(images) {
    let token
    if(typeof window !== 'undefined') {
      token = localStorage.getItem('token')
      if(!token) return;
    }

    const formDatas = new FormData();
    images.map((image) => {
      formDatas.append("images", image.imageFile);
    });
   
    const res = await Axios.put("http://localhost:8000/post-images", formDatas, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:
          `Bearer ${token}`,
      },
    })
    if (res.data.code === 201) {
      imagesPath.current = res.data.filesPath;
    }
    console.log(res.data);
  }

  // Handler when image is ordered
  function orderImages(initialPosition, finalPosition) {
    let initialImage = images[initialPosition];
    let arrayImage = images;
    arrayImage.splice(initialPosition, 1, images[finalPosition]);
    arrayImage.splice(finalPosition, 1, initialImage);
    setImages(arrayImage);
  }

  // Handler when an image is deleted from the array
  function deleteImage(event) {
    setImages(
      images.filter(
        (image) => image.key !== event.target.getAttribute("data-index")
      )
    );
  }

  function reset() {
    setImages([]);
  }
  return {
    images,
    updateImages,
    orderImages,
    deleteImage,
    reset,
    getPathImages,
    imagesPath,
  };
}

export default useImageState;

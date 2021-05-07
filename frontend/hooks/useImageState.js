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
    const formDatas = new FormData();
    images.map((image) => {
      formDatas.append("images", image.imageFile);
    });
    await Axios.put("http://localhost:8000/post-images", formDatas, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxjYWJpZW5lc3JhaWNlc3RrdEBnbWFpbC5jb20iLCJpYXQiOjE2MjA0MjM0MTUsImV4cCI6MTYyMDQzNDIxNSwic3ViIjoiNjA3MTA5Yjk5OWUwNmIzOWM0NDNiN2ViIn0.aQ6ZBohZddfcwUY6HfGXmll-9GzZxQmnHHI5zmNrGD",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.code === 201) {
          imagesPath.current = { filesPath: res.data.filesPath };
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Handler when image is ordered
  function orderImages(initialPosition, finalPosition) {
    let initialImage = images[initialPosition];
    let arrayImage = images;
    arrayImage.splice(initialPosition, 1, images[finalPosition]);
    arrayImage.splice(finalPosition, 1, initialImage);
    setImages(arrayImage);

    //console.log(event)
  }

  // Handler when an image is deleted from the array
  function deleteImage(event) {
    //console.log(event.target)
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

import { useState } from 'react'
const { v4: uuidv4 } = require('uuid')




async function processFile() {
  try {
    let file = document.getElementById('fileInput').files[0];
    let contentBuffer = await readFileAsync(file);
    console.log(contentBuffer);
  } catch(err) {
    console.log(err);
  }
}




function useImageState(initialVal) {
    // Sets the initial state of the images, if no argument is passed, the default state will be an empty array
    const [images, setImages] = useState([]);
    let newImages = [];

    // Handler when a image/images are loaded
    async function updateImages(e) {
         try {
            if(e.target.files){
                const fileArray = Array.from(e.target.files);
                let readedImage = null;
                for (let i = 0; i < fileArray.length; ++i){
                    let contentURL =  await readFileAsync(fileArray[i])
                    newImages.push(contentURL);
                }
                setImages([...images, ...newImages]);
            }
         } catch (error) {
             console.log(error)
         }
     }


    // Async function for FileReader API taken from Simon Schrader at https://simon-schraeder.de/posts/filereader-async/
    function readFileAsync(file) {
    return new Promise((resolve, reject) => {
            const reader = new FileReader();
            let readedImage = null;
            reader.onload = () => {
                resolve(readedImage ={
                    key:uuidv4(),
                    url:reader.result
                })
            }
            reader.onerror = reject;

            reader.readAsDataURL(file);
        })
    }




    // Handler when image is ordered
     function orderImages( event ){
         console.log(event)
     }

    // Handler when an image is deleted from the array
     function deleteImage( event ){
         console.log(event.target)
     }

    function reset (){
        setImages([]);
    }
    return {
        images,
        updateImages,
        orderImages,
        deleteImage,
        reset
    }

}

export default useImageState;

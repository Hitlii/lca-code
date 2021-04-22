
import {useState} from 'react'

import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import DeleteIcon from '@material-ui/icons/Delete';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
const { v4: uuidv4 } = require('uuid');
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import ContainerImageFile from './ShowImageFile'
const useStyles = makeStyles((theme) => ({
    button:{
        width:40,
        height:30,
        margin:20,
        borderRadius:15,
        backgroundColor:'#F2F2F2',
        color:'black',
        padding:0,
        
    },
    focusButtonStyle:{
        width:40,
        height:30,
        margin:20,
        borderRadius:15,
        backgroundColor:'grey',
        color:'black',
        padding:0,
        
    },
    iconStyle:{
        width:15,
        height:36,
    },
    imgButtonStyle:{
        margin:10,
        marginBottom:5,
        '&:hover':{
            backgroundColor:'black'
        }
    },
    imageStyle:{
        width:'60px',height:'50px',padding:'0px',margin:'0px'
    },
    container:{
        justifyContent: 'center'
    }

}))

const ManagerImage = ({selectImages,setSelectedImages}) => {
    const classes = useStyles()
    const [deleteMode,setDeleteMode] = useState(false)
    const [changeMode,setChangeMode] = useState(false)
    const [indexElement,setIndexElement] = useState(-1)


    const imageHandleChange=(e)=>{
        setChangeMode(false)
        setDeleteMode(false)
        if(e.target.files){
            const fileArray = Array.from(e.target.files)
            
            fileArray.map(preview=>{
                const reader = new FileReader()
                reader.onload = ()=>{
                    const variable ={
                        key:uuidv4(),
                        url:reader.result
                    }
                    setSelectedImages(prevImages=>[...prevImages,variable])
                }
                reader.readAsDataURL(preview)
            })          
        }
    }
    
    const handleImage =(e)=>{
        
        if(deleteMode){  
            setSelectedImages(selectImages.filter(image=>image.key !== e.target.getAttribute("data-index")))
        }else if(changeMode){
            if(indexElement < 0){
                let initIndex=selectImages.findIndex(element => element.key ===e.target.getAttribute("data-index"))
                setIndexElement(initIndex)
                
            } else if(indexElement >=0 ){
                
                let finalIndex=selectImages.findIndex(element => element.key ===e.target.getAttribute("data-index"))
                if(indexElement === finalIndex){
                    setIndexElement(-1)
                }else{ 
                    
                    let initElement = selectImages[indexElement]
                    let images = Array.from(selectImages)   
                    images.splice(indexElement,1,selectImages[finalIndex])
                    images.splice(finalIndex,1,initElement)
                    setSelectedImages(images)
                    setIndexElement(-1)
                    
                }
            } 
        }
    }

    const handleDeleteButton=()=>{
        setChangeMode(false)
        if(deleteMode === true) setDeleteMode(false)
            else setDeleteMode(true)
    }
    const handleChangeButton=()=>{
        setDeleteMode(false)
        if(changeMode === true) setChangeMode(false)
            else setChangeMode(true)
    }


    
    return (
        <div >           
            <Paper>
                <Grid container justify="center">
                    <IconButton 
                        variant="contained"
                        component="label"
                        className={classes.button}>
                            <input accept="image/*"
                                style={{display:'none'}}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={imageHandleChange}/>    
                        {<AddPhotoAlternateIcon/>}
                    </IconButton>

                    <IconButton 
                        variant="contained"
                        component="label"
                        className={deleteMode? classes.focusButtonStyle:classes.button}
                        onClick={handleDeleteButton}>
                        {<DeleteIcon/>}
                    </IconButton>
                    <IconButton 
                        variant="contained"
                        component="label"
                        className={changeMode? classes.focusButtonStyle:classes.button}
                        onClick={handleChangeButton}>
                        {<ViewModuleIcon/>}
                    </IconButton>
                </Grid>
            </Paper>
            <ContainerImageFile selectImages={selectImages} handleImage={handleImage}/>
            
        </div>
        
        
    )
}

export default ManagerImage
import { useState } from 'react'

import ContainerImageFile from './ShowImageFile'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import DeleteIcon from '@material-ui/icons/Delete'
import ViewModuleIcon from '@material-ui/icons/ViewModule'

const { v4: uuidv4 } = require('uuid')

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 10
  },
  button: {
    width: 40,
    height: 30,
    margin: 20,
    borderRadius: 15,
    padding: 0

  },
  focusButtonStyle: {
    width: 40,
    height: 30,
    margin: 20,
    borderRadius: 15,
    backgroundColor: 'grey',
    color: 'black',
    padding: 0

  },
  iconStyle: {
    width: 15,
    height: 36
  },
  imgButtonStyle: {
    margin: 10,
    marginBottom: 5,
    '&:hover': {
      backgroundColor: 'black'
    }
  },
  imageStyle: {
    width: '60px', height: '50px', padding: '0px', margin: '0px'
  },
  container: {
    justifyContent: 'center',
    marginBottom: 10
  }

}))

const ImageHandler = ({ images, updateImages,deleteImage,orderImages}) => {
  const classes = useStyles()

  const [deleteMode, setDeleteMode] = useState(false)
  const [changeMode, setChangeMode] = useState(false)
  const [initialPositionImage, setInitialPositionImage] = useState(-1)

  const handleChangeImages = e => {
    updateImages(e)
  }


  const handleImage = (e) => {
    if (deleteMode) {
      deleteImage(e)
    } else if (changeMode) {
      if (initialPositionImage < 0) {
        const firstPositionImage = images.findIndex(element => element.key === e.target.getAttribute('data-index'))
        setInitialPositionImage(firstPositionImage)
      } else if (initialPositionImage >= 0) {
        const finalPositionImage = images.findIndex(element => element.key === e.target.getAttribute('data-index'))
        if (initialPositionImage === finalPositionImage) {
          setInitialPositionImage(-1)
        } else {
          orderImages(initialPositionImage,finalPositionImage)
          setInitialPositionImage(-1)
        }
      }
    }
  }

  const handleDeleteButton = () => {
    setChangeMode(false)
    if (deleteMode === true) setDeleteMode(false)
    else setDeleteMode(true)
  }
  const handleChangeButton = () => {
    setDeleteMode(false)
    if (changeMode === true) setChangeMode(false)
    else setChangeMode(true)
  }

  return (
            <Paper className={classes.root} variant='outlined' elevation={0}>
                <Grid container justify="center">
                    <IconButton
                        variant="contained"
                        component="label"
                        className={classes.button}
                    >
                            <input accept="image/*"
                                style={{ display: 'none' }}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={handleChangeImages}/>
                        <AddPhotoAlternateIcon/>
                    </IconButton>

                    <IconButton
                        className={classes.button}
                        color={deleteMode ? 'inherit' : 'default'}
                        onClick={handleDeleteButton}>
                        <DeleteIcon/>
                    </IconButton>

                    <IconButton
                        className={classes.button}
                        color={changeMode ? 'inherit' : 'default'}
                        onClick={handleChangeButton}>
                        <ViewModuleIcon/>
                    </IconButton>
                </Grid>

                <ContainerImageFile images={images} handleImage={handleImage}/>
            </Paper>
  )
}

export default ImageHandler

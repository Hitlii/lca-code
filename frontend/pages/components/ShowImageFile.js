import { useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container'


const useStyles = makeStyles((theme) => ({
    imgButtonStyle:{
        margin:10,
        marginBottom:5,
        '&:hover':{
            backgroundColor:'black'
        }
    },
    imgStyle:{
        width:'60px',
        height:'50px',
        padding:'0px',
        margin:'0px',
        ['@media (min-width: 700px)']: { // eslint-disable-line no-useless-computed-key
            width:'200px',
            height:'100px',
          }
    }
}))

const ShowImageFile = ({ values, handleImage }) => {
    
    const classes = useStyles()

    return (
        <Container >
                <Paper>
                {values && values.map((photo)=>{
                    return <button 
                    className={classes.imgButtonStyle}
                    key={photo.key} 
                    onClick={handleImage}>
                        <img src={photo.url}  
                        data-index={photo.key} 
                        className={classes.imgStyle}/>
                    </button>
                })}
                </Paper>
               
        </Container>
    )
}

export default ShowImageFile

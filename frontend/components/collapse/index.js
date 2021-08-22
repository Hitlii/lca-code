import Collapse from '@material-ui/core/Collapse'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    collapse:{
        borderRadius: 15,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.22)'
    }
}))
export default function MyCollapse(props){
    const {children, in:open} = props
    const classes = useStyles()
    
    return (
        <Collapse in={open} className={classes.collapse}> 
            {props.children}
        </Collapse>
    )
} 
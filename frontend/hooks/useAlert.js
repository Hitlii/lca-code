import {useState} from 'react'



export default function useAlert(){
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({message:'', solution: '', severity: '', title:'' , success:''});

    function handleAlert(alert){
        setAlert(alert);
        setOpen(true);
    }

    function openAlert(){
        setOpen(true)
    }

    function closeAlert(){
        setOpen(false)
    }

    return [
        open,
        alert,
        openAlert,
        closeAlert,
        handleAlert
    ]
}

import React from 'react'
import ManagerImage from '../components/ManagerImage'
import {useState} from 'react'
const test = () => {

    const [selectImages,setSelectedImages]=useState([])
    

    return (
        <div>
            <ManagerImage selectImages={selectImages} setSelectedImages={setSelectedImages}/>
        </div>
    )
}

export default test

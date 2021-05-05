import React from 'react'

import { makeStyles, withStyles } from '@material-ui/core/styles'


const loginStyles = makeStyles(({
    formContainer: {
      margin: '0 auto',
      width: 340,
      height: 340,
      marginTop: 150,
    },
    img: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 30,
    },
    input: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 300,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#F2F2F2',
        paddingTop: 10,
        paddingLeft: 20,
    },
    button: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      height: 40,
      width: 300,
      marginBottom: 10,
      color: 'white',
      backgroundColor: '#4CAF50',
      borderRadius: 15
    },
    error: {
      margin: 0,
      padding: 0,
      paddingLeft: 25,
      marginTop: 5,
      marginBottom: 20,
      color: 'red',
    },
    header: {
        marginLeft: 20
    },
    link: {
        display: 'flex',
        justifyContent: 'left',
        fontWeight: 300,
        fontSize: 16,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        textDecoration: 'none',
        color: '#2196f3'
    },
  }))

export default loginStyles

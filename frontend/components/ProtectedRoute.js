import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'

const isBrowser = () => typeof window !== 'undefined';

function ProtectedRoute({ router, children }) {

    const { user } = useContext(AuthContext)
    
    let unprotectedRoutes = [
        '/',
        '/propiedad',
        '/propiedad/[url]',
        '/propiedades',
        '/propiedades/[...filter]',
        '/servicios',
        '/nosotros',
        '/vender-propiedad',
        '/404',
        '/admin1/login',
    ]

    let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;
    if(isBrowser() && !user && pathIsProtected) {
        return (
            <h1>Acceso Denegado</h1>
        )
    } else 
        return children 
}

export default ProtectedRoute
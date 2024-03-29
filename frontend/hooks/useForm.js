import { useFormik } from 'formik'
import * as yup from 'yup'

const useForm = (callback, initialState = {}) => {

    const validationSchema = yup.object({
        name: yup 
            .string('Nombre completo')
            .matches(/^[A-Za-z ]*$/, 'Ingresa un nombre válido')
            .max(35, 'Muy largo!')
            .required('Nombre del cliente es requerido'),
        gender: yup 
            .string('Género')
            .required('Género es requerido'),
        birthday: yup 
            .string('Fecha de nacimiento')
            .required('Fecha de nacimiento requerida'),
        email: yup
            .string('Email')
            .email('Ingresa un email válido')
            .required('Email es requerido'),
        phone: yup
            .string('Teléfono')
            .matches(/^\d+$/, 'Este campo solo debe contener números')
            .max(16, 'Muy largo!')
            .required('Número telefónico requerido'),
        city: yup 
            .string('Ciudad')
            .matches(/^[A-Za-z ]*$/, 'Este solo debe contener letras!')
            .max(40, 'Muy largo!')
            .required('Ciudad es requerida'),
        state: yup 
            .string('Estado')
            .matches(/^[A-Za-z ]*$/, 'Este solo debe contener letras!')
            .max(20, 'Muy largo!')
            .required('Estado requerido'),        
        address: yup 
            .string('Dirección')
            .max(100, 'Muy largo!')
            .required('Dirección es requerida'),     
    })

    const client = useFormik({
        initialValues: initialState,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values)
            callback()
        }
    })

    return {
        client
    }
} 

export default useForm


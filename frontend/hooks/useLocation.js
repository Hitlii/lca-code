import { useFormik } from 'formik'
import * as yup from 'yup'

const useLocation = () => {

    const validationSchema = yup.object({
        state: yup
            .string()
            .required('Estado es requerido'),
        city: yup
            .string()
            .required('Ciudad es requerida'),
        address: yup
            .string()
            .required('Dirección es requerida')
            .max(20,'Muy largo!')
    })

    const location = useFormik({
        initialValues: {
            state:'Baja California',
            city: '',
            address: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    })

    const cities = ['Tijuana', 'Tecate', 'San Quintin', 'Ensenada', 'Mexicali', 'Rosarito']

    return {
        location,
        cities
    }
}

export default useLocation
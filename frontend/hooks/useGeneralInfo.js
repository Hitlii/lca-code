import { useFormik } from 'formik'
import * as yup from 'yup'

const useGeneralInfo = () => {

    const validationSchema = yup.object({
        code: yup 
            .string()
            .required('Código es requerido')
            .max(15, 'Muy largo!'),
        status: yup
            .string()
            .required('Requerido'),
        zone: yup
            .string()
            .required('Requerido'),
        type: yup 
            .string()
            .required('Requerido')
        
    })

    const generalInfo = useFormik({
        initialValues: {
            code:'',
            status: '',
            type: '',
            zone: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) =>{
            console.log(values)
        }
    })

    const status = ['Venta', 'Renta']
    const zones = ['Campestre', 'Urbana', 'Comercial']
    const types = ['Casa', 'Terreno', 'Rancho']

    return { 
        generalInfo,
        status, 
        zones, 
        types
    }
}

export default useGeneralInfo
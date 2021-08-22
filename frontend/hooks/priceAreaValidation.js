import { useFormik } from 'formik'
import * as yup from 'yup'

export default function priceAreaValidation(){
    const validationSchema = yup.object({
        currency: yup
            .string()
            .required('Divisa es requerida'),
        price: yup
            .number()
            .required('Precio es requerido'),
        specialPrice: yup 
            .string()
            .max(20, 'Este campo debe ser menor a 20 caracteres'),
        paymentPrice: yup 
            .string()
            .max(20, 'Este campo debe ser menor a 20 caracteres'),
        area: yup 
            .number()
            .required('Área es requerida')
    })

    // Initialization of values
    const priceArea = useFormik({
        initialValues: {
            currency: '',
            price: '',
            specialPrice: '',
            paymentPrice: '',
            area: '',
        }, 
        validationSchema: validationSchema,
    })

    // Available currencies
    const currencies = ['USD','MXN']

    return { 
        priceArea,
        currencies
    }
    
}

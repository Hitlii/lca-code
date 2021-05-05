import { useFormik } from 'formik'
import * as yup from 'yup'

const usePriceAndArea = () => {
    
    const validationSchema = yup.object({
        currency: yup
            .string()
            .required('Requerido'),
        price: yup
            .number()
            .required('Precio es requerido'),
        specialPrice: yup 
            .string()
            .max(20, 'Muy largo!'),
        paymentPrice: yup 
            .string()
            .max(20, 'Muy largo!'),
        area: yup 
            .number()
            .required('Área es requerida')
    })

    const priceAndArea = useFormik({
        initialValues: {
            currency: '',
            price: '',
            specialPrice: '',
            paymentPrice: '',
            area: '',
        }, 
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    })

    const currencies = ['USD','MXN']

    return { 
        priceAndArea,
        currencies
    }
}

export default usePriceAndArea
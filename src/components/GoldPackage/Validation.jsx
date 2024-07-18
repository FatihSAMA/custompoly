import * as Yup from 'yup'

const goldValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    gameName: Yup.string().required('Required'),

})

export default goldValidationSchema
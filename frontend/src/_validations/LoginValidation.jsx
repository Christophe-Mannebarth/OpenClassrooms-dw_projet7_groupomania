import * as Yup from 'yup'

// form validation rules
export const loginValidation = Yup.object().shape({
  email: Yup.string().required('Email requis'),
  password: Yup.string().required('Mot de passe requis'),
})

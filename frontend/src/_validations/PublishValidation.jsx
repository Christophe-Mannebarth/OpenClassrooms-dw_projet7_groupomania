import * as Yup from 'yup'

// form validation rules
export const publishValidation = Yup.object().shape({
  title: Yup.string()
    .required('Titre requis')
    .matches(
      /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s'-.,!?]+$/,
      'Alphabet, nombres et ponctuation uniquement'
    )
    .min(3, '3 caractères minimum')
    .max(20, '30 caractères maximum'),
  postContent: Yup.string()
    .required('Message requis')
    .matches(
      /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s'-.,!?"]+$/,
      'Alphabet, nombres et ponctuation uniquement'
    )
    .min(3, '3 caractères minimum')
    .max(300, '300 caractères maximum'),
})

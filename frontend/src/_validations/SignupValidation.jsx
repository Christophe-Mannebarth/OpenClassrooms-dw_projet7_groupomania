import * as Yup from 'yup'

// form validation rules
export const signupValidation = Yup.object().shape({
  username: Yup.string()
    .required('Pseudonyme requis')
    // no _ or . at the beginning
    // no __ or _. or ._ or .. inside
    // allowed characters: a-zA-Z0-9._
    // no _ or . at the end
    .matches(
      /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Caractère non autorisé'
    )
    .min(3, '3 caractères minimum')
    .max(15, '15 caractères maximum'),
  email: Yup.string()
    .required('Email requis')
    .matches(
      /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/,
      "Mauvais format de l'adresse mail"
    ),
  password: Yup.string()
    .required('Mot de passe requis')
    .matches(
      /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Au moins une majuscule, un chiffre et un caractère spécial'
    )
    .min(5, '5 caractères minimum')
    .max(15, '15 caractères maximum'),
})

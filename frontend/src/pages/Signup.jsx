import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector, useDispatch } from 'react-redux'
import { history, selectAuthError, selectAuthUser } from '_helpers'
import { authActions } from '_store'
import { signupValidation } from '_validations'

import { FadeInSection } from '_style'

// SIGNUP
/* Function that call the signup action and returns the signup form. */
function Signup() {
  const dispatch = useDispatch()
  // SELECTORS
  const authUser = useSelector(selectAuthUser)
  const authError = useSelector(selectAuthError)

  useEffect(() => {
    // redirect to home if already logged in
    if (authUser) history.navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Call the signup form validation component
  const formOptions = { resolver: yupResolver(signupValidation) }

  // Get functions to build form with useForm() hook
  const { register, handleSubmit, formState, reset } = useForm(formOptions)
  const { errors, isSubmitting } = formState

  // Call the signup function in the auth.slice file from the Store
  function onSubmit({ username, email, password }) {
    return dispatch(authActions.signup({ username, email, password }))
  }

  // Display the signup form
  return (
    <FadeInSection>
      <div className="col-md-12 mt-5 form-signup">
        <div className="shadow alert alert-info">
          Merci de créer un compte - *champs obligatoires
        </div>
        <div className="card shadow">
          <h4 className="card-header header-signup">Inscription</h4>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>*Pseudo</label>
                <input
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Entre 3 et 15 lettres et/ou nombres ..."
                  {...register('username')}
                  className={`form-control ${
                    errors.username ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.username?.message}
                </div>
              </div>
              <div className="form-group">
                <label>*Email</label>
                <input
                  name="email"
                  type="text"
                  autoComplete="username"
                  placeholder="votrenom@adresse.com ..."
                  {...register('email')}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>
              <div className="form-group">
                <label>*Mot de passe</label>
                <input
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Entre 5 et 15 caractères ..."
                  {...register('password')}
                  className={`form-control ${
                    errors.password ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>
              </div>
              <button
                disabled={isSubmitting}
                className="btn btn-primary my-3 me-3"
              >
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                S'inscrire
              </button>
              <button
                type="button"
                className="btn btn-danger my-3 "
                onClick={() => reset()}
              >
                Effacer
              </button>
              {authError && (
                <div className="alert alert-danger mt-3 mb-0">
                  {authError.message}
                </div>
              )}
              <p className="card-text">
                Déja enregistré?{' '}
                <Link style={{ textDecoration: 'none' }} to={'/login'}>
                  Connectez vous
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </FadeInSection>
  )
}

export { Signup }

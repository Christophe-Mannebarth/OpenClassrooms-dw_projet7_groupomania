import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector, useDispatch } from 'react-redux'
import { history, selectAuthError, selectAuthUser } from '_helpers'
import { authActions } from '_store'
import { loginValidation } from '_validations'

import { FadeInSection } from '_style'

/* Function that returns the login form. */
function Login() {
  // SELECTORS
  const authUser = useSelector(selectAuthUser)
  const authError = useSelector(selectAuthError)

  const dispatch = useDispatch()

  useEffect(() => {
    // redirect to home if already logged in
    if (authUser) history.navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Call the login form validation component
  const formOptions = { resolver: yupResolver(loginValidation) }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, reset } = useForm(formOptions)
  const { errors, isSubmitting } = formState

  // Call the login function in the auth.slice file from the Store
  function onSubmit({ email, password }) {
    return dispatch(authActions.login({ email, password }))
  }

  // Display the login form
  return (
    <FadeInSection>
      <div className="col-md-12 mt-5 form-login">
        <div className="shadow alert alert-info">
          Vous devez vous connecter - *champs obligatoires
        </div>
        <div className="card shadow">
          <h4 className="card-header header-login">Connexion</h4>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>*Email</label>
                <input
                  name="email"
                  type="text"
                  autoComplete="username"
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
                  autoComplete="current-password"
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
                Connexion
              </button>
              <button
                type="button"
                className="btn btn-danger my-3"
                onClick={() => reset()}
              >
                Effacer
              </button>
              {authError && (
                <div className="alert alert-danger mt-3 mb-0">
                  {authError.message}
                </div>
              )}
              <p className="card-text pb-2">
                Pas encore de compte?{' '}
                <Link style={{ textDecoration: 'none' }} to={'/signup'}>
                  Enregistrez vous
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </FadeInSection>
  )
}

export { Login }

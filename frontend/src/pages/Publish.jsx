import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { publishValidation } from '_validations'
import { postsActions } from '_store'
import {
  selectAuthUser,
  selectCreateOneError,
  selectCreateOneIsCreated,
} from '_helpers'

import { FadeInSection } from '_style'

// PUBLISH
/**
 * Send a post request to the database and returns a publish form
 * @returns A form.
 */
function Publish() {
  const dispatch = useDispatch()
  // SELECTORS
  const createOneError = useSelector(selectCreateOneError)
  const isCreated = useSelector(selectCreateOneIsCreated)
  const authUser = useSelector(selectAuthUser)

  const [image, setImage] = useState('')

  // Call the publish form validation component
  const formOptions = { resolver: yupResolver(publishValidation) }

  // Get functions to build form with useForm() hook
  const { register, handleSubmit, formState, reset } = useForm(formOptions)
  const { errors, isSubmitting } = formState

  // Prepare data as "formData" to use "multipart/form-data"
  // as "content-type" of the header of the request
  // then call the createPost function in the posts.slice file from the Store
  function onSubmit(data) {
    const formData = new FormData()
    formData.append('image', image)
    formData.append('title', data.title)
    formData.append('postContent', data.postContent)
    formData.append('author', authUser.userName)
    return dispatch(postsActions.createPost({ formData }))
  }

  // Display the form
  return (
    <FadeInSection>
      <div className="col-md-12 mt-5 form-publish">
        <div className="shadow alert alert-info">
          Publiez votre message - *champs obligatoires
        </div>
        <div className="card shadow">
          <h4 className="card-header header-publish">Publication</h4>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>*Titre</label>
                <input
                  name="title"
                  type="text"
                  placeholder="Entre 3 et 30 caractères ..."
                  {...register('title')}
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.title?.message}</div>
              </div>
              <div className="form-group">
                <label>*Message</label>
                <textarea
                  name="postContent"
                  type="text"
                  placeholder="Entre 3 et 300 caractères ..."
                  {...register('postContent')}
                  className={`form-control ${
                    errors.postContent ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.postContent?.message}
                </div>
              </div>
              <div className="form-group">
                <label>*Image</label>
                <input
                  name="image"
                  id="fileItem"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.image?.message}</div>
              </div>
              <div className="form-group d-flex justify-content-center mt-4 justify-content-md-end gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary my-3"
                >
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Poster
                </button>
                <button
                  type="button"
                  className="btn btn-danger my-3"
                  onClick={() => reset()}
                >
                  Effacer
                </button>
              </div>
              {createOneError && (
                <div className="alert alert-danger mt-3 mb-0">
                  {createOneError.message}
                </div>
              )}
              {isCreated && (
                <div className="alert alert-success mt-3 mb-0">
                  {isCreated.message}
                </div>
              )}
              <p className="card-text">
                Abandonner la publication?{' '}
                <Link style={{ textDecoration: 'none' }} to={'/'}>
                  Retournez à l'accueil
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </FadeInSection>
  )
}

export { Publish }

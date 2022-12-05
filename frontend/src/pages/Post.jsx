import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectDeleteOneError,
  selectDislikeOneError,
  selectGetOneError,
  selectGetOneIsLoading,
  selectLikeOneError,
  selectTheme,
} from '_helpers'
import { postsActions } from '_store'
import { DisplayPost } from '_components'

import { FadeInSection, LoaderWrapper, Loader } from '_style'

// POST
/**
 * Returns the content of the post.
 * There are 3 buttons: 1 modify, 1 delete,
 * visible only by the post creator or by the administrator
 * and 1 return to home page visible by all users
 * @returns The displayPost component is being returned.
 */
function Post() {
  // SELECTORS
  const theme = useSelector(selectTheme)
  const getOneError = useSelector(selectGetOneError)
  const deleteOneError = useSelector(selectDeleteOneError)
  const likeOneError = useSelector(selectLikeOneError)
  const dislikeOneError = useSelector(selectDislikeOneError)
  const isLoading = useSelector(selectGetOneIsLoading)

  // Recover the post ID in the address bar
  const { id: postId } = useParams()

  // The getPost function recovers a post in the database
  // It will be launched at each render of the post page.
  useEffect(() => {
    getPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dispatch = useDispatch()
  const getPost = async () => {
    await dispatch(postsActions.getOnePost({ postId }))
  }

  // ERRORS HANDLER
  // if the server returns an error during the get request:
  if (getOneError) {
    return (
      <div className="alert alert-danger mt-3 mb-0">{getOneError.message}</div>
    )
  }
  // if the server returns an error during the delete request:
  if (deleteOneError) {
    return (
      <div className="alert alert-danger mt-3 mb-0">
        {deleteOneError.message}
      </div>
    )
  }
  // if the server returns an error during the liking request:
  if (likeOneError) {
    return (
      <div className="alert alert-danger mt-3 mb-0">{likeOneError.message}</div>
    )
  }
  // if the server returns an error during the disliking request:
  if (dislikeOneError) {
    return (
      <div className="alert alert-danger mt-3 mb-0">
        {dislikeOneError.message}
      </div>
    )
  }

  // if the request is in progress, display the loader
  // Call the DisplayPost Component to display the post
  // The presence of data in the global state will be verified
  // and in case of absence the getPost() function will be launched
  // to recover it in the database
  if (isLoading) {
    return (
      <LoaderWrapper>
        <Loader theme={theme} data-testid="loader" />
      </LoaderWrapper>
    )
  } else {
    return (
      <>
        <FadeInSection>
          <DisplayPost />
        </FadeInSection>
      </>
    )
  }
}

export { Post }

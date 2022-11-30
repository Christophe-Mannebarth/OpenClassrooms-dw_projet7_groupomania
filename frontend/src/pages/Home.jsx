import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCreateOneIsCreated,
  selectDeleteOneIsDeleted,
  selectGetAllContent,
  selectGetAllError,
  selectGetAllIsLoading,
  selectTheme,
  selectUpdateOneIsUpdated,
} from '_helpers'
import { postsActions } from '_store'
import { DisplayPosts } from '_components'

import Container from 'react-bootstrap/Container'
import {
  FadeInSection,
  LoaderWrapper,
  Loader,
  PageSubtitle,
  PageTitle,
} from '_style'

// HOME
/**
 * Request all the posts from the database and display them all
 * @returns The displayPosts component is being returned.
 */
function Home() {
  // SELECTORS
  const theme = useSelector(selectTheme)
  const isLoading = useSelector(selectGetAllIsLoading)
  const getAllError = useSelector(selectGetAllError)
  const data = useSelector(selectGetAllContent)
  const isCreated = useSelector(selectCreateOneIsCreated)
  const isDeleted = useSelector(selectDeleteOneIsDeleted)
  const isUpdated = useSelector(selectUpdateOneIsUpdated)

  // The getPosts function recovers all the posts in the database
  // It will be launched only if there is no data concerning the posts
  // present in the global state,
  // OR when creating OR deleting OR updating a post.
  useEffect(() => {
    if (!data || isCreated || isDeleted || isUpdated) {
      getPosts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dispatch = useDispatch()
  const getPosts = async () => {
    await dispatch(postsActions.getAllPosts())
  }

  // ERRORS HANDLER
  // if the server return an error:
  if (getAllError) {
    return (
      <div className="alert alert-danger mt-3 mb-0">{getAllError.message}</div>
    )
  }

  // if the request is in progress, display the loader
  // Call the DisplayPosts Component to display all the posts
  // The presence of data in the global state will be verified
  // and in case of absence the getPosts function will be launched
  // to recover them in the database
  if (isLoading) {
    return (
      <LoaderWrapper>
        <Loader theme={theme} data-testid="loader" />
      </LoaderWrapper>
    )
  } else {
    return (
      <>
        <Container className="groupomedia">
          <PageTitle className="page-title" theme={theme}>
            Groupomédia
          </PageTitle>
          <PageSubtitle className="page-subtitle" theme={theme}>
            Votre réseau social d'entreprise
          </PageSubtitle>
        </Container>
        <FadeInSection>
          <DisplayPosts />
        </FadeInSection>
      </>
    )
  }
}

export { Home }

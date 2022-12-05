import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { postsActions } from '_store'
import {
  selectAuthUser,
  selectDislikeOneDislikes,
  selectDislikeOneIsDisliked,
  selectDislikeOneUsersDisliked,
  selectGetOneContent,
  selectLikeOneIsLiked,
  selectLikeOneLikes,
  selectLikeOneUsersLiked,
  selectTheme,
} from '../_helpers'

import DefaultImage from '../assets/no-image.jpg'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { HandThumbsDownFill, HandThumbsUpFill } from 'react-bootstrap-icons'
import {
  Card,
  Row,
  Col,
  Container,
  OverlayTrigger,
  Tooltip,
  Button,
} from 'react-bootstrap'
import { StyledLink } from '_style'

// DISPLAY POST
export const DisplayPost = () => {
  // SELECTORS
  const data = useSelector(selectGetOneContent)
  const authUser = useSelector(selectAuthUser)
  const theme = useSelector(selectTheme)
  const isLiked = useSelector(selectLikeOneIsLiked)
  const likes = useSelector(selectLikeOneLikes)
  const isDisliked = useSelector(selectDislikeOneIsDisliked)
  const dislikes = useSelector(selectDislikeOneDislikes)
  const usersLiked = useSelector(selectLikeOneUsersLiked)
  const usersDisliked = useSelector(selectDislikeOneUsersDisliked)

  // Recover the post ID in the address bar
  const { id: postId } = useParams()

  const dispatch = useDispatch()

  // If there is data concerning the post content in the global state:
  if (data) {
    const authUserId = authUser.userId
    const isAdmin = authUser.isAdmin
    const author = data.author
    const imageUrl = data.imageUrl
    const title = data.title
    const postContent = data.postContent
    const dataUserId = data.userId

    /*--------------------------- DELETE -----------------------------*/

    /* Delete post*/
    // Dispatch action deletePost() when the delete button is clicked
    const deletion = async () => {
      await dispatch(postsActions.deletePost({ postId }))
    }
    /*--------------------------- LIKES ------------------------------*/

    /* Liking */
    const liking = async () => {
      // If the user has not already liked the post ...
      if (!isLiked) {
        // ... in case he did not already dislike:
        // give 1 as a value to like for the likePost() function
        if (!isDisliked) {
          try {
            await dispatch(postsActions.likePost({ postId, like: 1 }))
          } catch (error) {
            console.log(error)
          }

          // ... in the event that he has already disliked the post:
          // gives 0 as value to like for the dislikePost() function
          // give 1 as a value to like for the likePost() function
        } else {
          try {
            await dispatch(postsActions.dislikePost({ postId, like: 0 }))
            await dispatch(postsActions.likePost({ postId, like: 1 }))
          } catch (error) {
            console.log(error)
          }
        }

        // Otherwise it is that the user in already like the post
        // gives 0 as value to like for the likePost() function
      } else {
        try {
          await dispatch(postsActions.likePost({ postId, like: 0 }))
        } catch (error) {
          console.log(error)
        }
      }
    }

    /*Trigger likes */
    // Displays an infobulle with the list of users who have liked
    function TriggerLikes() {
      const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Likes:
          {usersLiked.map((user) => {
            return (
              <Container key={user}>
                <li>{user}</li>
              </Container>
            )
          })}
        </Tooltip>
      )
      return (
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 250 }}
          overlay={renderTooltip}
        >
          <Button onClick={() => liking()} className="button-thumb-up-post">
            {/* If the post was not already liked by the user
            displays a gray thumb */}
            {!isLiked ? (
              <HandThumbsUpFill className="thumb-up-post" />
            ) : (
              // Otherwise displays a blue thumb
              <HandThumbsUpFill className="thumb-up-post" color="royalblue" />
            )}
          </Button>
        </OverlayTrigger>
      )
    }

    /*-------------------------- DISLIKES ------------------------------*/

    /* Disliking */
    const disliking = async () => {
      // If the user has not already disliked the post ...
      if (!isDisliked) {
        // ... in the event that he did not already like:
        // gives -1 as a value to Like for the dislikePost() function
        if (!isLiked) {
          try {
            await dispatch(postsActions.dislikePost({ postId, like: -1 }))
          } catch (error) {
            console.log(error)
          }

          // ... in the event that he has already liked the post:
          // gives 0 as a value to like for the likePost()
          // gives -1 as a value to Like for the dislikePost() function
        } else {
          try {
            await dispatch(postsActions.likePost({ postId, like: 0 }))
            await dispatch(postsActions.dislikePost({ postId, like: -1 }))
          } catch (error) {
            console.log(error)
          }
        }
        // Otherwise it is that the user has already disliked the post
        // gives 0 as value to like for the dislikePost() function
      } else {
        try {
          await dispatch(postsActions.dislikePost({ postId, like: 0 }))
        } catch (error) {
          console.log(error)
        }
      }
    }

    /*Trigger dislikes */
    // Displays an infobulle with the list of users who have disliked
    function TriggerDislikes() {
      const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Dislikes:
          {usersDisliked.map((user) => {
            return (
              <Container key={user}>
                <li>{user}</li>
              </Container>
            )
          })}
        </Tooltip>
      )
      return (
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 250 }}
          overlay={renderTooltip}
        >
          <Button
            onClick={() => disliking()}
            className="button-thumb-down-post"
          >
            {/* If the post was not already disliked by the user
                      displays a gray thumb */}
            {!isDisliked ? (
              <HandThumbsDownFill className="thumb-down-post" />
            ) : (
              // Otherwise displays a red thumb
              <HandThumbsDownFill className="thumb-down-post" color="red" />
            )}
          </Button>
        </OverlayTrigger>
      )
    }

    /*--------------------------- DISPLAY -------------------------------*/

    // Display the post
    return (
      <>
        <Card className="flex-fill shadow card-post" key={postId}>
          <Row xs={1} sm={1} md={1} lg={2} xl={2}>
            <Col className="col-left-post">
              {imageUrl ? (
                <Zoom>
                  <Card.Img
                    className="img-post"
                    src={imageUrl}
                    alt={`Image du message de ${author}`}
                  />
                </Zoom>
              ) : (
                <Card.Img
                  className="img-post"
                  src={DefaultImage}
                  alt="Image par défaut"
                />
              )}
            </Col>
            <Col className="d-flex col-right-post">
              <Card.Header as="h5" className="d-flex header-post">
                {title}
              </Card.Header>
              <Card.Body className="card-body-post">
                <Card.Text className="d-flex content-post">
                  {postContent}
                </Card.Text>
              </Card.Body>
              {/* If the user is the post creator or if he is administrator
                displays the modification and deletion buttons */}
              {authUserId === dataUserId || isAdmin === true ? (
                <Container fluid className="container-links-post">
                  <div className="d-flex my-4 mx-auto links-post">
                    <StyledLink
                      $isPostsCardLink
                      theme={theme}
                      to={`/post/update/${postId}`}
                    >
                      Modifier
                    </StyledLink>
                    <StyledLink
                      $isPostsCardLink
                      theme={theme}
                      to=""
                      onClick={() => deletion()}
                    >
                      Supprimer
                    </StyledLink>
                    <StyledLink $isPostsCardLink theme={theme} to={'/'}>
                      Retour
                    </StyledLink>
                  </div>
                </Container>
              ) : (
                // Otherwise displays only the Return button
                <Container className="container-links-post">
                  <div className="d-flex my-4 mx-auto links-post">
                    <StyledLink $isPostsCardLink theme={theme} to={'/'}>
                      Retour
                    </StyledLink>
                  </div>
                </Container>
              )}

              <Card.Footer className="d-flex footer-post">
                <div className="d-inline-block text-muted author-post">
                  Auteur: {author}
                </div>
                <Container className="d-flex thumbs-post">
                  <div>
                    <TriggerLikes />
                    {likes}
                  </div>
                  <div>
                    <TriggerDislikes />
                    {dislikes}
                  </div>
                </Container>
              </Card.Footer>
            </Col>
          </Row>
        </Card>
      </>
    )
    // if there is no data in the global state
    // data will be loaded with the getPost() function in the Post page
  } else {
    return
  }
}

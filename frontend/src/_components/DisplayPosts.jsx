import { EmptyList } from '_components'
import { useSelector } from 'react-redux'
import { selectGetAllContent, selectTheme } from '_helpers'
import DefaultImage from '../assets/no-image.jpg'

import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { StyledLink } from '_style'

// DISPLAY POSTS
export const DisplayPosts = () => {
  // SELECTORS
  const theme = useSelector(selectTheme)
  const data = useSelector(selectGetAllContent)

  // If there is data concerning the posts in the global state:
  if (data) {
    // display all the posts
    return (
      <>
        <Container fluid>
          {/* if there is at least one post, display the posts cards
          in the opposite sense of their creation */}
          {data.length > 0 ? (
            <Row xs={1} md={2} lg={3} xl={4}>
              {data
                .slice(0)
                .reverse()
                .map((post) => (
                  <Col className="d-flex mb-4 col-posts" key={post._id}>
                    <Card className="flex-fill shadow">
                      <Card.Header
                        as="h5"
                        className="d-inline-block header-posts"
                      >
                        {post.title}
                      </Card.Header>
                      {post.imageUrl ? (
                        <Card.Img
                          className="img-posts"
                          variant="middle"
                          src={post.imageUrl}
                          alt="post"
                        />
                      ) : (
                        <Card.Img
                          className="img-posts"
                          variant="middle"
                          src={DefaultImage}
                          alt="post"
                        />
                      )}
                      <Card.Body>
                        <Card.Text className="d-inline-block text-truncate content-posts">
                          {post.postContent}
                        </Card.Text>
                        <StyledLink
                          $isPostsCardLink
                          theme={theme}
                          to={`/post/${post._id}`}
                          key={`post-${post._id}`}
                        >
                          Lire
                        </StyledLink>
                      </Card.Body>
                      <Card.Footer className="text-muted footer-posts">
                        Auteur: {post.author}
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
            </Row>
          ) : (
            // else display an image with a message
            <EmptyList theme={theme} />
          )}
        </Container>
      </>
    )
    // Otherwise: data will be loaded
    // with the getPosts function in the Home page
  } else {
    return
  }
}

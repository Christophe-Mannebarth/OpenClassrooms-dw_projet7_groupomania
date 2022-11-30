// SELECTORS

/* theme */
export const selectTheme = (state) => state.theme

/* auth user */
export const selectAuthUser = (state) => state.auth.user
export const selectAuthError = (state) => state.auth.error

/* get all posts */
export const selectGetAllIsLoading = (state) => state.posts.getAll.isLoading
export const selectGetAllContent = (state) => state.posts.getAll.content
export const selectGetAllError = (state) => state.posts.getAll.error

/* get one post */
export const selectGetOneIsLoading = (state) => state.posts.getOne.isLoading
export const selectGetOneContent = (state) => state.posts.getOne.content
export const selectGetOneError = (state) => state.posts.getOne.error

/* create one post */
export const selectCreateOneIsCreated = (state) =>
  state.posts.createOne.isCreated
export const selectCreateOneError = (state) => state.posts.createOne.error

/* delete one post */
export const selectDeleteOneIsDeleted = (state) =>
  state.posts.deleteOne.isDeleted
export const selectDeleteOneError = (state) => state.posts.deleteOne.error

/* update one post */
export const selectUpdateOneIsUpdated = (state) =>
  state.posts.updateOne.isUpdated
export const selectUpdateOneError = (state) => state.posts.updateOne.error

/* like one post */
export const selectLikeOneIsLiked = (state) => state.posts.likeOne.isLiked
export const selectLikeOneUsersLiked = (state) => state.posts.likeOne.usersLiked
export const selectLikeOneLikes = (state) => state.posts.likeOne.likes
export const selectLikeOneError = (state) => state.posts.likeOne.error

/* dislike one post */
export const selectDislikeOneIsDisliked = (state) =>
  state.posts.dislikeOne.isDisliked
export const selectDislikeOneUsersDisliked = (state) =>
  state.posts.dislikeOne.usersDisliked
export const selectDislikeOneDislikes = (state) =>
  state.posts.dislikeOne.dislikes
export const selectDislikeOneError = (state) => state.posts.dislikeOne.error

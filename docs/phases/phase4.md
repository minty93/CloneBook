# Phase 4: Photos and Likes (1.5 days)
## Rails
### Models
  * Photo
  * Like

### Controllers
  * Api::PhotosController (create, destroy, index, show, update)
  * Api::LikesController (create, destroy)

### Views
  * photos/index.json.jbuilder
  * photos/show.json.jbuilder

## Flux
### Views (React Components)

### Stores
  * Photo
  * Like
### Actions
  * ApiActions.receiveAllPhotos
  * ApiActions.receiveSinglePhoto
  * ApiActions.deletePhoto
  * ApiActions.destroyLike

### ApiUtil
  * ApiUtil.fetchAllPhotos
  * ApiUtil.fetchSinglePhoto
  * ApiUtil.createPhoto
  * ApiUtil.editPhoto
  * ApiUtil.destroyPhoto

## Gems/Libraries
* react-quill (npm)

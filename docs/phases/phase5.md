# Phase 5: Notification

## Rails
### Models
  * Notification

### Controllers
  * Api::NotificationsController (create, destroy, index, show, update)

### Views
  * notification/index.json.jbuilder

## Flux
### Views (React Components)


### Stores
  * Notification

### Actions
  * ApiActions.receiveAllNotifications -> triggered by ApiUtil
  * NotificationActions.fetchAllNotifications -> triggers ApiUtil


### ApiUtil
  * ApiUtil.fetchAllNotifications
  * ApiUtil.updateNotification

## Gems/Libraries

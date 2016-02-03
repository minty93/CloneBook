# Schema Information


<!-- ## profile

column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
description | text      | not null -->


## comments (polymorphic association)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer  | not null
body        | string    |
commentable_type| string|
commentable_id| integer | not null, foreign key (references commentable), indexed

## posts
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | text      | not null
author_id   | integer   | not null not null, foreign key (references user), indexed
profile_id  | integer   | not null not null, foreign key (references user), indexed



## pictures (polymorphic association)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
photo       | img       | not null
description        | string    |
imageable_type| string  |
imageable_id| integer   | not null, foreign key (references imageable), indexed

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
description | text      |
user_id     | integer   | not null, foreign key (references users), indexed

## Friendships (association)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | text      | not null, foreign key (references users), indexed
friend_id     | integer   | not null, foreign key (references users), indexed

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
fname           | string    | not null
lname           | string    | not null
gender          | string    | not null,
birthday        | integer   | not null

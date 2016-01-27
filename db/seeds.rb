# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all

user1 = User.create!(fname: "Aarushi", lname: "Jain", birthday: "1993-05-28", gender: "female", email: "aarushi", password: "aarushi")
user1 = User.create!(fname: "Guest", lname: "Jain", birthday: "1993-05-28", gender: "female", email: "guest", password: "password")

Post.destroy_all

a = Post.create!(body: "Hello I am the first post", author_id: 1, profile_id: 2)
b = Post.create!(body: "Hello I am the second post", author_id: 1, profile_id: 2)
c = Post.create!(body: "Hello I am the third post", author_id: 2, profile_id: 1)
d = Post.create!(body: "Hello I am the fourth post", author_id: 2, profile_id: 1)
e = Post.create!(body: "Hello I am the fifth post", author_id: 2, profile_id: 1)

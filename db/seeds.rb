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

class StaticPagesController < ApplicationController

  def root
  end

end



# React:
# <Feed />
# AJAX request for posts

# Rails:
# Posts Controller
# Post.where(.....) follower = @current_user.id
# @current_user.posts.order(created_at: :desc)

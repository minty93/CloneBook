class StaticPagesController < ApplicationController

  before_action :ensure_user_logged_in

  def root
  end

end 

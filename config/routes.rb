Rails.application.routes.draw do
  resources :comments
  root to: 'static_pages#root'

  resources :users, only: [:create, :new]
  resource :session, only: [:create, :new, :destroy]


  namespace :api, defaults: {format: :json} do
    resources :posts do
      resources :comments
    end
    resources :users, only: [:show, :index]
  end

end

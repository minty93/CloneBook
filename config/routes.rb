Rails.application.routes.draw do
  resources :images
  root to: 'static_pages#root'

  resources :users
  resource :session, only: [:create, :new, :destroy]


  namespace :api, defaults: {format: :json} do

    resources :posts do
      resources :comments, except: [:destroy]
    end
    resources :photos
    resources :users, only: [:show, :index, :create, :new, :update]
    resource :session, only: [:create, :destroy, :show, :new]
    resources :comments, only: [:destroy]
    get "search", to: "utils#search"
  end


end

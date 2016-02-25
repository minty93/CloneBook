Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users
  resource :session, only: [:create, :new, :destroy]
  get 'auth/facebook/callback', to: 'sessions#omniauth_facebook'


  namespace :api, defaults: {format: :json} do
    resources :friend_requests, except: [:destroy]
    resources :posts do
      resources :comments, except: [:destroy] do
      end
      resources :likes, except: [:destroy]
    end
    resources :photos, only: [:create, :destroy, :new, :show]
    resources :users, only: [:show, :index, :create, :new, :update]
    resource :session, only: [:create, :destroy, :show, :new]
    resources :comments, only: [:destroy] do
      resources :likes, except: [:destroy]
    end
    resources :likes, only: [:destroy]
    get "search", to: "utils#search"
    delete "friend_requests", to: "friend_requests#destroy" 
  end


end

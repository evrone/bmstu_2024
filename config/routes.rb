Rails.application.routes.draw do 
  root 'home#index'
  #devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  devise_for :users
  get 'auth/:provider/callback', to: 'sessions#create'
  get '/login', to: 'sessions#new'
  
  resources :users

  get "up" => "rails/health#show", as: :rails_health_check
  get 'sessions/create'

  namespace :admin, constraints: AdminConstraint.new do
    resources :users

    root to: "users#index"
  end
end

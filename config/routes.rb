Rails.application.routes.draw do
  root 'home#index'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  get 'admin', to: 'admin#index'
  resources :users

  get "up" => "rails/health#show", as: :rails_health_check
end

Rails.application.routes.draw do
  root 'home#index'
  get 'sessions/challenge'
  get 'auth/:provider/callback', to: 'sessions#create'
  get '/login', to: 'sessions#new'
  get "up" => "rails/health#show", as: :rails_health_check
  get 'sessions/create'
  
end

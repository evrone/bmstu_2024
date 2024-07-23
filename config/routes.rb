# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  get 'sessions/challenge'
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'sessions/view'
  get '/login', to: 'sessions#new'
  get 'sessions/user_sign_out'
  resources :users

  constraints AdminConstraint.new do
    mount RailsPerformance::Engine, at: 'performance'
  end

  scope '(:locale)', locale: /#{I18n.available_locales.join('|')}/ do
    get 'auth/:provider/callback', to: 'sessions#create'
    get '/login', to: 'sessions#new'
    get 'up' => 'rails/health#show', as: :rails_health_check
    get 'sessions/create'
    get 'sessions/view'
    root 'home#index'
  end

  namespace :admin, constraints: AdminConstraint.new do
    resources :users

    root to: 'users#index'
  end

  match '*path', to: 'errors#not_found', via: :all
end

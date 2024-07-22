# frozen_string_literal: true

Rails.application.routes.draw do
  get 'sessions/challenge'
  devise_for :users
  get 'auth/:provider/callback', to: 'sessions#create'
  get '/login', to: 'sessions#new'

  resources :users

  constraints AdminConstraint.new do
    mount RailsPerformance::Engine, at: 'performance'
  end

  scope '(:locale)', locale: /#{I18n.available_locales.join('|')}/ do
    get 'auth/:provider/callback', to: 'sessions#create'
    get '/login', to: 'sessions#new'
    get 'up' => 'rails/health#show', as: :rails_health_check
    get 'sessions/create'
    get 'home/show', to: 'home#show'
    root 'home#index'
  end

  match '*path', to: 'errors#not_found', via: :all

  namespace :admin, constraints: AdminConstraint.new do
    resources :users

    root to: 'users#index'
  end
end

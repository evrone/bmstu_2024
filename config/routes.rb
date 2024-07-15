# frozen_string_literal: true

Rails.application.routes.draw do
  scope '(:locale)', locale: /#{I18n.available_locales.join('|')}/ do
    get 'auth/:provider/callback', to: 'sessions#create'
    get '/login', to: 'sessions#new'
    get 'up' => 'rails/health#show', as: :rails_health_check
    get 'sessions/create'
    root 'home#index'
  end
end

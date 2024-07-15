Rails.application.routes.draw do

  get 'admin', to: 'admin#index'
  resources :users

  constraints AdminConstraint.new do
    mount RailsPerformance::Engine, at: 'performance'
  end

  scope "(:locale)", locale: /#{I18n.available_locales.join("|")}/ do
    get 'auth/:provider/callback', to: 'sessions#create'
    get '/login', to: 'sessions#new'
    get "up" => "rails/health#show", as: :rails_health_check
    get 'sessions/create'
    root 'home#index'
  end
  
    match '*path', to: 'errors#not_found', via: :all
end

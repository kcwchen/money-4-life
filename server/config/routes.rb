Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :users, only: [:new, :create] do
        get :current, on: :collection
      end
      resources :notifications, only: [:index, :update]
      resources :transactions
      resources :budgets
      resources :subscriptions
      resources :accounts
      resources :categories
      resource :session, only: [:create, :destroy]
    end
    match "*unmatched_route", to: "application#not_found", via: :al
  end
end

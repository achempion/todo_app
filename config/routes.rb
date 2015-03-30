Rails.application.routes.draw do
  root to: 'frameworks#angular'

  resources :tasks, except: [:new, :show]

  get 'angular', to: 'frameworks#angular'
  get 'flux', to: 'frameworks#flux'
  get 'ember', to: 'frameworks#ember'
end

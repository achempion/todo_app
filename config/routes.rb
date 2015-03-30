Rails.application.routes.draw do
  root to: 'frameworks#angular'

  resources :tasks, except: [:new, :show]
end

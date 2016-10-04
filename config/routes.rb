Rails.application.routes.draw do
root 'ideas#index'

  namespace :api do
    namespace :v1 do
      resources :ideas, only: [:index, :show, :create, :edit, :destroy]
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  shallow do
    resources :boards do
      resources :columns do
        resources :tasks
      end
    end
  end
  
end

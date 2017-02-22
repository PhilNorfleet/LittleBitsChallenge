SampleReactRailsApp::Application.routes.draw do
  resources :inventions
  root :to => redirect("/inventions")
end

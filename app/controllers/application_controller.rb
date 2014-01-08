class ApplicationController < ActionController::Base
  before_filter :authenticate_user!
  layout :layout_by_resource

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  protected
    def layout_by_resource
      if devise_controller?
        "session"
      else
        "application"
      end
    end
end

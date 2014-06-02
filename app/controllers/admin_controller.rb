class AdminController < ActionController::Base
  layout false
  
  # before_action :authenticate_user!
  before_action :authenticate_user!, if: -> { !request.env["HTTP_DEBUG"] }

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private

  def force_json_format
    request.format = 'json'
  end

  def render_error error
    render json: { error: error }, status: :bad_request
  end

end

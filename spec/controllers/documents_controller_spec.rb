require 'spec_helper'

describe DocumentsController do
  login_user

  it "should get index" do
    get :index

    response.should be_success
  end
end

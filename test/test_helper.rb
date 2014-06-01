ENV["RAILS_ENV"] ||= "test"
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'database_cleaner'

DatabaseCleaner.strategy = :transaction

class ActiveSupport::TestCase
  ActiveRecord::Migration.check_pending!

  include FactoryGirl::Syntax::Methods

  def setup
    DatabaseCleaner.start
  end

  def teardown
    DatabaseCleaner.clean
  end

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  #
  # Note: You'll currently still have to declare fixtures explicitly in integration tests
  # -- they do not yet inherit this setting
  # fixtures :all

  # Add more helper methods to be used by all tests here...
end

class ActionController::TestCase
  include Devise::TestHelpers

  def setup
    @request.env["devise.mapping"] = Devise.mappings[:user]
    user = FactoryGirl.create(:user)
    # user.confirm! # or set a confirmed_at inside the factory. Only necessary if you are using the confirmable module
    sign_in user
  end
end

# source 'https://rubygems.org'
source 'http://ruby.taobao.org'

gem 'rails', '4.0.2' # Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'sqlite3'        # Use sqlite3 as the database for Active Record

gem 'sass-rails', '~> 4.0.0'
gem 'coffee-rails', '~> 4.0.0'

group :assets do
  gem 'uglifier', '>= 1.3.0'
  gem 'therubyracer'
end

gem 'jquery-rails'
gem 'ancestry'
gem 'active_model_serializers', github: 'rails-api/active_model_serializers'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

# Use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.1.2'

group :production do
  gem 'unicorn' # Use unicorn as the app server
end

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

group :development, :test do
  gem 'pry'
  gem 'pry-nav'
  gem 'pry-rails'
end

group :development do
  gem 'thin'
  gem 'capistrano', require: false
end

group :test do
  gem 'factory_girl_rails'   # https://github.com/thoughtbot/factory_girl/blob/master/GETTING_STARTED.md
  gem 'ffaker'
  gem 'rspec-rails'          # https://www.relishapp.com/rspec/rspec-rails/docs
  gem 'database_cleaner'
end

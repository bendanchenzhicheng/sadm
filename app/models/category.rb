class Category < ActiveRecord::Base
  has_ancestry

  has_many :documents

  validates_presence_of :name
end

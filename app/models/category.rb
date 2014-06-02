class Category < ActiveRecord::Base
  has_ancestry

  has_many :documents, dependent: :nullify

  validates_presence_of :name

  scope :roots, -> { where(ancestry: nil) }
end

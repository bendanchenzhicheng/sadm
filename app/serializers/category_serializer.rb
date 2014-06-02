class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :ancestry, :position
end

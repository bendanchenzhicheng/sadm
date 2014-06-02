class CategorySerializer < ActiveModel::Serializer

  attributes :id, :name, :ancestry, :position, :isParent

  def isParent
    object.has_children?
  end

end

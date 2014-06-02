class CategorySerializer < ActiveModel::Serializer

  attributes :id, :pid, :name, :ancestry, :position, :isParent

  def pid
    object.id
  end

  def isParent
    object.has_children?
  end

end

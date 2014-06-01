require 'test_helper'

class CategoryTest < ActiveSupport::TestCase

  test "should be a root node default" do
    category = create :category
    assert category.is_root?
  end

  test "should has children" do
    category1 = create :category
    category2 = create :category, parent: category1

    assert category1.has_children?
  end

  test "should has many documents" do
    category = create :category

    2.times {
      create :document, category: category
    }

    assert_equal 2, category.documents.count
  end
end

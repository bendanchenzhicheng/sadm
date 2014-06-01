require 'test_helper'

class DocumentTest < ActiveSupport::TestCase

  test "render content before save" do
    document = create :document, content: "*Yuanxin Qiu*"
    assert_equal "<p><em>Yuanxin Qiu</em></p>", document.rendered_content
  end

  test "belongs to category" do
    document = create :document
    assert_kind_of Category, document.category
  end

end

require 'spec_helper'

describe Document do

  it "should render content before save" do
    document = create :document, content: "*Yuanxin Qiu*"

    expect(document.rendered_content).to eq("<p><em>Yuanxin Qiu</em></p>")
  end

  it "should belongs to category" do
    document = create :document

    expect(document.category).to be_a_kind_of(Category)
  end

end

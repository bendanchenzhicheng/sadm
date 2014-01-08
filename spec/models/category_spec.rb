require 'spec_helper'

describe Category do

  it "should be a root node default" do
    category = create :category

    expect(category.is_root?).to be_true
  end

  it "should has children" do
    category1 = create :category
    category2 = create :category, parent: category1

    expect(category1.has_children?).to be_true
  end

  it "should has many documents" do
    category = create :category

    2.times {
      create :document, category: category
    }

    expect(category.documents.count).to eq(2)
  end

end

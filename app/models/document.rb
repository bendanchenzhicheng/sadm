require 'minidown'
class Document < ActiveRecord::Base

  belongs_to :category

  before_save :render_content

  private
    def render_content
      return unless changed.include?("content")
      self.rendered_content = Minidown.parse(content).to_html
    end
end

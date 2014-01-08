class CreateDocuments < ActiveRecord::Migration
  def change
    create_table :documents do |t|
      t.text :content
      t.text :rendered_content
      t.integer :category_id

      t.timestamps
    end
  end
end

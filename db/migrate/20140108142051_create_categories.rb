class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name
      t.string :ancestry
      t.integer :position, default: 0

      t.timestamps
    end

    add_index :categories, :ancestry
  end
end

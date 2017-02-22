class CreateInventions < ActiveRecord::Migration
  def change
    create_table :inventions do |t|
      t.string :title
      t.text :description_text
    end
  end
end

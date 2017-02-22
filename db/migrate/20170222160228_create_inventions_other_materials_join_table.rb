class CreateInventionsOtherMaterialsJoinTable < ActiveRecord::Migration[5.0]
  def change
    create_table :inventions_other_materials, id: false do |t|
      t.integer :invention_id
      t.integer :other_material_id
    end
  end
end

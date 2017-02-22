class CreateBitsInventionsJoinTable < ActiveRecord::Migration[5.0]
  def change
    create_table :bits_inventions, id: false do |t|
      t.integer :invention_id
      t.integer :bit_id
    end
  end
end

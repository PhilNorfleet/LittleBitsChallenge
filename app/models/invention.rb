class Invention < ActiveRecord::Base
  has_and_belongs_to_many :bits
  has_and_belongs_to_many :other_materials

  validates :bits, :length => { :minimum => 1}
end

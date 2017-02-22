class Invention < ActiveRecord::Base
  has_and_belongs_to_many :bits
  has_and_belongs_to_many :other_materials
  # before_save :ensure_invention_uses_bit

  # def ensure_invention_uses_bit
  #   if self.bit_ids.length < 1
  #     errors.add(:base, "An invention must have at least one 'bit'")
  #     throw :abort
  #   else
  #     return true
  #   end
  # end
end

class Bit < ActiveRecord::Base
  has_and_belongs_to_many :inventions
end

class Board < ApplicationRecord
  has_many :columns, -> { order(position: :asc) }
  
  validates :name,
            presence: true,
            uniqueness: true
end

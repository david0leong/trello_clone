class Board < ApplicationRecord
  has_many :columns, -> { order(position: :asc) }, dependent: :destroy
  
  validates :name, presence: true
end

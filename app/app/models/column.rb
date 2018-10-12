class Column < ApplicationRecord
  belongs_to :board
  has_many :tasks
  
  acts_as_list scope: :board

  validates :board, presence: true
  validates :name,
            presence: true,
            uniqueness: { scope: :board }
end

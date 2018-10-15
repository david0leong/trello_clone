class Column < ApplicationRecord
  belongs_to :board
  has_many :tasks, -> { order(position: :asc) }, dependent: :destroy
  
  acts_as_list scope: :board

  validates :board, presence: true
  validates :name, presence: true
end

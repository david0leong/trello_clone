class Column < ApplicationRecord
  belongs_to :board

  validates :board, presence: true
  validates :name,
            presence: true,
            uniqueness: { scope: :board }
  validates :position,
            presence: true,
            numericality: { greater_than: 0 },
            uniqueness: { scope: :board }
end

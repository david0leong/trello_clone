class Task < ApplicationRecord
  belongs_to :column

  acts_as_list scope: :column

  validates :column, presence: true
  validates :name, presence: true
end

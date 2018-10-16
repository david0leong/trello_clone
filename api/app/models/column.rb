# == Schema Information
#
# Table name: columns
#
#  id         :bigint(8)        not null, primary key
#  board_id   :bigint(8)
#  name       :string
#  title      :string
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Column < ApplicationRecord
  belongs_to :board
  has_many :tasks, -> { order(position: :asc) }, dependent: :destroy
  
  acts_as_list scope: :board

  validates :board, presence: true
  validates :name, presence: true
end

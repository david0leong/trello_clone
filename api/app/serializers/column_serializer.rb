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

class ColumnSerializer < ActiveModel::Serializer
  attributes :id, :board_id, :name, :title, :position, :created_at, :updated_at

  has_many :tasks
end

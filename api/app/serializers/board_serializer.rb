# == Schema Information
#
# Table name: boards
#
#  id         :bigint(8)        not null, primary key
#  name       :string
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BoardSerializer < ActiveModel::Serializer
  attributes(*Board.attribute_names.map(&:to_sym))

  has_many :columns, if: :nested?

  def nested?
    @instance_options[:nested]
  end
end

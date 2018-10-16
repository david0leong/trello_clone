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

require 'test_helper'

class BoardTest < ActiveSupport::TestCase
  def setup
    @board = Board.new(
      name: 'MyTime',
      title: 'MyTime board'
    )
  end

  test 'should be valid' do
    assert @board.valid?
  end

  test 'name should be present' do
    @board.name = '    '
    
    assert_not @board.valid?
  end
end

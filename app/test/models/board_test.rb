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

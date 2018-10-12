require 'test_helper'

class BoardTest < ActiveSupport::TestCase
  def setup
    @board = Board.new(
      name: 'personal',
      title: 'Personal board'
    )
  end

  test 'should be valid' do
    assert @board.valid?
  end

  test 'name should be present' do
    @board.name = '    '
    
    assert_not @board.valid?
  end

  test 'name should be unique' do
    dup_board = @board.dup
    @board.save
    
    assert_not dup_board.valid?
  end
end

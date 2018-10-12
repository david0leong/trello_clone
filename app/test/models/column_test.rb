require 'test_helper'

class ColumnTest < ActiveSupport::TestCase
  def setup
    @column = Column.new(
      board: boards(:personal),
      name: 'backlog',
      title: 'Backlog',
      position: 4
    )
  end

  test 'should be valid' do
    assert @column.valid?
  end

  test 'board should be present' do
    @column.board = nil

    assert_not @column.valid?
  end
  
  test 'name should be present' do
    @column.name = '    '

    assert_not @column.valid?
  end
end

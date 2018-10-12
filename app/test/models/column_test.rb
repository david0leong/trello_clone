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

  test 'name should be unique per board' do
    dup_column = @column.dup
    dup_column.position = 5
    @column.save
    
    assert_not dup_column.valid?
    
    dup_column.name = 'icebox'

    assert dup_column.valid?
  end

  test 'position should be greater than 0' do
    @column.position = -1

    assert_not @column.valid?
  end
  
  test 'position should be unique per board' do
    dup_column = @column.dup
    dup_column.name = 'icebox'
    @column.save

    assert_not dup_column.valid?
    
    dup_column.position = 5

    assert dup_column.valid?
  end
end

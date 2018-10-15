require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  def setup
    @task = Task.new(
      column: columns(:personal_todo),
      name: 'coding',
      title: 'Coding',
      position: 3
    )
  end

  test 'should be valid' do
    assert @task.valid?
  end

  test 'column should be present' do
    @task.column = nil

    assert_not @task.valid?
  end

  test 'name should be present' do
    @task.name = '    '

    assert_not @task.valid?
  end
end

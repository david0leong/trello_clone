require 'test_helper'

class TasksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @task = tasks(:personal_todo_task1)
  end

  test "should get index" do
    get column_tasks_url(@task.column), as: :json
    assert_response :success
  end

  test "should create task" do
    assert_difference('Task.count') do
      post column_tasks_url(@task.column), params: { task: { name: @task.name + '1', position: @task.position + 1, title: @task.title } }, as: :json
    end

    assert_response 201
  end

  test "should show task" do
    get task_url(@task), as: :json
    assert_response :success
  end

  test "should update task" do
    patch task_url(@task), params: { task: { column_id: @task.column_id, name: @task.name, position: @task.position, title: @task.title } }, as: :json
    assert_response 200
  end

  test "should destroy task" do
    assert_difference('Task.count', -1) do
      delete task_url(@task), as: :json
    end

    assert_response 204
  end
end

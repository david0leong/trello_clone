require 'test_helper'

class ColumnsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @column = columns(:personal_todo)
  end

  test "should get index" do
    get board_columns_url(@column.board), as: :json
    assert_response :success
  end

  test "should create column" do
    assert_difference('Column.count') do
      post board_columns_url(@column.board), params: { column: { name: @column.name + '1', position: @column.position + 1, title: @column.title } }, as: :json
    end

    assert_response 201
  end

  test "should show column" do
    get column_url(@column), as: :json
    assert_response :success
  end

  test "should update column" do
    patch column_url(@column), params: { column: { board_id: @column.board_id, name: @column.name, position: @column.position, title: @column.title } }, as: :json
    assert_response 200
  end

  test "should destroy column" do
    assert_difference('Column.count', -1) do
      delete column_url(@column), as: :json
    end

    assert_response 204
  end
end

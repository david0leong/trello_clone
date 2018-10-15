class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.references :column, foreign_key: true
      t.string :name
      t.string :title
      t.integer :position

      t.timestamps
    end
  end
end

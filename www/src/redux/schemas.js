import { schema } from 'normalizr'

export const taskSchema = new schema.Entity('tasks')

export const columnSchema = new schema.Entity(
  'columns',
  {
    tasks: [taskSchema],
  },
  {
    // Add empty array as default tasks if not exists
    processStrategy: value => Object.assign({ tasks: [] }, value),
  }
)

export const boardSchema = new schema.Entity(
  'boards',
  {
    columns: [columnSchema],
  },
  {
    // Add empty array as default columns if not exists
    processStrategy: value => Object.assign({ columns: [] }, value),
  }
)

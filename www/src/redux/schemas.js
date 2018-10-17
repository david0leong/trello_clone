import { schema } from 'normalizr'

export const taskSchema = new schema.Entity('tasks')
export const taskListSchema = [taskSchema]

export const columnSchema = new schema.Entity('columns', {
  tasks: taskListSchema,
})
export const columnListSchema = [columnSchema]

export const boardSchema = new schema.Entity('boards', {
  columns: columnListSchema,
})
export const boardListSchema = [boardSchema]

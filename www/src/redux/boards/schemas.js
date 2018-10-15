import { schema } from 'normalizr'

export const boardSchema = new schema.Entity('boards')
export const boardListSchema = [boardSchema]

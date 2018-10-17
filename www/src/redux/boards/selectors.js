import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'
import filter from 'lodash/fp/filter'
import orderBy from 'lodash/fp/orderBy'
import zipObject from 'lodash/zipObject'

import {
  selectNestedColumnById,
  selectTaskPositionsOfColumn,
} from '../columns/selectors'

const DOMAIN_NAME = 'boards'

const selectDomainState = state => state[DOMAIN_NAME]

const selectBoardAllIds = createSelector(
  selectDomainState,
  domainState => domainState.allIds
)

const selectBoardByIdMap = createSelector(
  selectDomainState,
  domainState => domainState.byId
)

export const selectBoardById = createCachedSelector(
  selectBoardByIdMap,
  (state, boardId) => boardId,
  (boardsById, boardId) => boardsById[boardId]
)((state, boardId) => boardId)

export const selectColumnsOfBoard = createCachedSelector(
  state => state,
  selectBoardById,
  (state, board) => {
    if (!board) {
      return []
    }

    return flow(
      map(columnId => selectNestedColumnById(state, columnId)),
      filter(column => !!column),
      orderBy(['position'], ['asc'])
    )(board.columns)
  }
)((state, boardId) => boardId)

export const selectNestedBoardById = createCachedSelector(
  selectBoardById,
  selectColumnsOfBoard,
  (board, columns) => {
    if (!board) {
      return undefined
    }

    return {
      ...board,
      columns,
    }
  }
)((state, boardId) => boardId)

export const selectAllBoards = createSelector(
  state => state,
  selectBoardAllIds,
  (state, boardAllIds) =>
    boardAllIds.map(boardId => selectBoardById(state, boardId))
)

export const selectColumnPositionsOfBoard = createCachedSelector(
  selectColumnsOfBoard,
  columns =>
    columns.map(column => ({
      id: column.id,
      position: column.position,
      title: `${column.position}. ${column.title} (${column.name})`,
    }))
)((state, boardId) => boardId)

export const selectTaskPositionsOfBoard = createCachedSelector(
  state => state,
  selectColumnPositionsOfBoard,
  (state, columnPositions) => {
    const columnTaskPositions = zipObject(
      columnPositions.map(column => column.id),
      columnPositions.map(column =>
        selectTaskPositionsOfColumn(state, column.id)
      )
    )

    return {
      columnPositions,
      columnTaskPositions,
    }
  }
)((state, boardId) => boardId)

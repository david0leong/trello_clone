import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'
import filter from 'lodash/fp/filter'
import orderBy from 'lodash/fp/orderBy'

import { selectColumnById, selectNestedColumnById } from '../columns/selectors'

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

export const selectNestedBoardById = createCachedSelector(
  state => state,
  selectBoardById,
  (state, board) => {
    if (!board) {
      return undefined
    }

    const columns = flow(
      map(columnId => selectNestedColumnById(state, columnId)),
      filter(column => !!column),
      orderBy(['position'], ['asc'])
    )(board.columns)

    return {
      ...board,
      columns,
    }
  }
)((state, boardId) => boardId)

export const selectColumnPositionsOfBoard = createCachedSelector(
  state => state,
  selectBoardById,
  (state, board) => {
    if (!board) {
      return []
    }

    return flow(
      map(columnId => selectColumnById(state, columnId)),
      filter(column => !!column),
      orderBy(['position'], ['asc']),
      map(column => ({
        position: column.position,
        title: `${column.position}. ${column.title} (${column.name})`,
      }))
    )(board.columns)
  }
)((state, boardId) => boardId)

export const selectAllBoards = createSelector(
  state => state,
  selectBoardAllIds,
  (state, boardAllIds) =>
    boardAllIds.map(boardId => selectBoardById(state, boardId))
)

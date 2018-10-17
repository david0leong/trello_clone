import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

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
  (byId, boardId) => byId[boardId]
)((state, boardId) => boardId)

export const selectAllBoards = state => {
  const allIds = selectBoardAllIds(state)

  return allIds.map(id => selectBoardById(state, id))
}

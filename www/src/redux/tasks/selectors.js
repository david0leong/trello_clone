import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

const DOMAIN_NAME = 'tasks'

const selectDomainState = state => state[DOMAIN_NAME]

const selectTaskAllIds = createSelector(
  selectDomainState,
  domainState => domainState.allIds
)

const selectTaskByIdMap = createSelector(
  selectDomainState,
  domainState => domainState.byId
)

export const selectTaskById = createCachedSelector(
  selectTaskByIdMap,
  (state, boardId) => boardId,
  (byId, boardId) => byId[boardId]
)((state, boardId) => boardId)

export const selectAllTasks = state => {
  const allIds = selectTaskAllIds(state)

  return allIds.map(id => selectTaskById(state, id))
}

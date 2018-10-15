import { createSelector } from 'reselect'

const DOMAIN_NAME = 'boards'

const getDomainState = store => store[DOMAIN_NAME]

export const getBoardAllIds = createSelector(
  getDomainState,
  domainState => domainState.allIds
)

export const getBoardByIdMap = createSelector(
  getDomainState,
  domainState => domainState.byId
)

export const getBoardById = createSelector(
  getBoardByIdMap,
  (store, id) => id,
  (byId, id) => ({ ...byId[id], id })
)

export const getBoards = createSelector(
  getBoardAllIds,
  getBoardByIdMap,
  (allIds, byId) => allIds.map(id => ({ ...byId[id], id }))
)

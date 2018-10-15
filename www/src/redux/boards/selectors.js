import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

const DOMAIN_NAME = 'boards'

const getDomainState = state => state[DOMAIN_NAME]

export const getBoardsLoading = createSelector(
  getDomainState,
  domainState => domainState.loading
)

export const getBoardAllIds = createSelector(
  getDomainState,
  domainState => domainState.allIds
)

export const getBoardByIdMap = createSelector(
  getDomainState,
  domainState => domainState.byId
)

export const getBoardById = createCachedSelector(
  getBoardByIdMap,
  (state, id) => id,
  (byId, id) => ({ ...byId[id], id })
)((state, id) => id)

export const getBoards = createSelector(
  state => state,
  getBoardAllIds,
  (state, allIds) => allIds.map(id => getBoardById(state, id))
)

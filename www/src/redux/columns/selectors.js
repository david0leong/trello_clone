import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

import { selectTaskById } from '../columns/selectors'
const DOMAIN_NAME = 'columns'

const selectDomainState = state => state[DOMAIN_NAME]

const selectColumnAllIds = createSelector(
  selectDomainState,
  domainState => domainState.allIds
)

const selectColumnByIdMap = createSelector(
  selectDomainState,
  domainState => domainState.byId
)

export const selectColumnById = createCachedSelector(
  state => state,
  selectColumnByIdMap,
  (state, columnId) => columnId,
  (state, byId, columnId) => {
    const column = byId[columnId]
    const tasks = column.tasks.map(taskId => selectTaskById(state, taskId))

    return {
      ...column,
      tasks,
    }
  }
)((state, columnId) => columnId)

export const selectAllColumns = state => {
  const allIds = selectColumnAllIds(state)

  return allIds.map(id => selectColumnById(state, id))
}

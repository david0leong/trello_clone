import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

import { selectTaskById } from '../tasks/selectors'

const DOMAIN_NAME = 'columns'

const selectDomainState = state => state[DOMAIN_NAME]

const selectColumnByIdMap = createSelector(
  selectDomainState,
  domainState => domainState.byId
)

export const selectColumnById = createCachedSelector(
  selectColumnByIdMap,
  (state, columnId) => columnId,
  (columnsById, columnId) => columnsById[columnId]
)((state, columnId) => columnId)

export const selectNestedColumnById = createCachedSelector(
  state => state,
  selectColumnById,
  (state, column) => {
    if (!column) {
      return undefined
    }

    const tasks = column.tasks.map(taskId => selectTaskById(state, taskId))

    return {
      ...column,
      tasks,
    }
  }
)((state, columnId) => columnId)

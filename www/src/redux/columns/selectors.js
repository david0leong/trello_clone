import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'
import orderBy from 'lodash/fp/orderBy'

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

    const tasks = flow(
      map(taskId => selectTaskById(state, taskId)),
      orderBy(['position'], ['asc'])
    )(column.tasks)

    return {
      ...column,
      tasks,
    }
  }
)((state, columnId) => columnId)

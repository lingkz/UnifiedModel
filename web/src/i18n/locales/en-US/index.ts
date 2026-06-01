import { enUSCommon } from './common'
import { enUSEntityTopoExplorer } from './entityTopoExplorer'
import { enUSLanding } from './landing'
import { enUSQuery } from './query'
import { enUSSettings } from './settings'
import { enUSUModelExplorer } from './umodelExplorer'

export const enUS = {
  ...enUSCommon,
  ...enUSEntityTopoExplorer,
  ...enUSQuery,
  ...enUSUModelExplorer,
  ...enUSSettings,
  ...enUSLanding,
} as const

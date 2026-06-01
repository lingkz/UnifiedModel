import { enUSCommon } from './common'
import { enUSEntityTopoExplorer } from './entityTopoExplorer'
import { enUSUModelExplorer } from './umodelExplorer'
import { enUSLanding } from './landing'
import { enUSSettings } from './settings'

export const enUS = {
  ...enUSCommon,
  ...enUSEntityTopoExplorer,
  ...enUSUModelExplorer,
  ...enUSSettings,
  ...enUSLanding,
} as const

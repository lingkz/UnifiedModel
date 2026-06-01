import { enUSCommon } from './common'
import { enUSUModelExplorer } from './umodelExplorer'
import { enUSLanding } from './landing'
import { enUSSettings } from './settings'

export const enUS = {
  ...enUSCommon,
  ...enUSUModelExplorer,
  ...enUSSettings,
  ...enUSLanding,
} as const

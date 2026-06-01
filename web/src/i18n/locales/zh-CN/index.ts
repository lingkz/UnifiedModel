import type { enUS } from '../en-US'
import { zhCNCommon } from './common'
import { zhCNEntityTopoExplorer } from './entityTopoExplorer'
import { zhCNUModelExplorer } from './umodelExplorer'
import { zhCNLanding } from './landing'
import { zhCNSettings } from './settings'

export const zhCN = {
  ...zhCNCommon,
  ...zhCNEntityTopoExplorer,
  ...zhCNUModelExplorer,
  ...zhCNSettings,
  ...zhCNLanding,
} satisfies Record<keyof typeof enUS, string>

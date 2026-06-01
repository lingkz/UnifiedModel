import type { enUS } from '../en-US'
import { zhCNCommon } from './common'
import { zhCNEntityTopoExplorer } from './entityTopoExplorer'
import { zhCNLanding } from './landing'
import { zhCNQuery } from './query'
import { zhCNSettings } from './settings'
import { zhCNUModelExplorer } from './umodelExplorer'

export const zhCN = {
  ...zhCNCommon,
  ...zhCNEntityTopoExplorer,
  ...zhCNQuery,
  ...zhCNUModelExplorer,
  ...zhCNSettings,
  ...zhCNLanding,
} satisfies Record<keyof typeof enUS, string>

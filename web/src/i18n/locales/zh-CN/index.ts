import type { enUS } from '../en-US'
import { zhCNCommon } from './common'
import { zhCNUModelExplorer } from './umodelExplorer'
import { zhCNLanding } from './landing'
import { zhCNSettings } from './settings'

export const zhCN = {
  ...zhCNCommon,
  ...zhCNUModelExplorer,
  ...zhCNSettings,
  ...zhCNLanding,
} satisfies Record<keyof typeof enUS, string>

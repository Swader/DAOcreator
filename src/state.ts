import { Notification } from "./redux/reducers/notifications"
export interface RootState {
  daoCreator: DAOcreatorState
  notification: NotificationState
  waitingAnimation: WaitingAnimationState
}

import * as Arc from "./lib/integrations/arc"
export interface DAOcreatorState {
  step: number
  stepValidation: boolean[]
  config: Arc.DAOConfig
  founders: Arc.Founder[]
  schemes: Arc.SchemeConfig[]
  deployedDao: Arc.DAO | undefined
}

// TODO: move this out of global state
// Move this into a component and use it in the root of a tool's view
export interface NotificationState {
  notifications: { [id: string]: Notification }
}

// TODO: move this out of global state
// Wrap a view in a loading component instead
export interface WaitingAnimationState {
  message: string
  details?: string
  type?: "transaction"
  open: boolean
}

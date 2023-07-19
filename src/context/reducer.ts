import { GlobalStateType } from './types/globalState'
import { ActionKind, GlobalStateActions } from './types/actions'

const reducer = (state: GlobalStateType, action: GlobalStateActions) => {
  if (action.type === ActionKind.TOGGLE_THEME) {
    return {
      ...state,
      darkTheme: action.payload.darkTheme,
    }
  }
  throw new Error(`no such action : ${action.type}`)
}

export default reducer

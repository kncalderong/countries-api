export enum ActionKind {
  TOGGLE_THEME = 'TOGGLE_THEME',
}

export type GlobalStateActions = {
  type: ActionKind.TOGGLE_THEME
  payload: {
    darkTheme: boolean
  }
}

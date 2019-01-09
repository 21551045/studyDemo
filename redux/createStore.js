function createStore(state, reducer) {
  let appState = state
  const getState = () => appState
  let listeners = []
  const subscribe = (listener) => {
    listeners.push(listener)
  }
  const dispatch = action => {
    appState = reducer(state, action)
    listeners.forEach((listener) => {
      listener()
    })
  }

  return {getState,dispatch,subscribe}
}
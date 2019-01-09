const logger = store => next => action => {
  console.log('dispatching',action);
  let result = next(action)
  console.log('next state',store.getState());
  return result
}

const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch(err){
    console.error('Caught an exception', err)
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw err
  }
}

export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export default function applyMiddleware(...middlewares) {
  return (createStore) => (...args) => {
    // 之后就在这里先建立一个store
    const store = createStore(...args)
    let dispatch = store.dispatch
    let chain = []
    // 将getState 跟dispatch函数暴露出去
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    //这边返回chain的一个数组，里面装的是wrapDispatchToAddLogging那一层，相当于先给
     //middle剥了一层皮，也就是说
    // 接下来只需要开始传入dispatch就行
    chain = middlewares.map(middleware => middleware(middlewareAPI))

    dispatch = compose(...chain)(store.dispatch)
    // 翻译过来就是
    // wrapCrashReport(wrapDispatchToAddLogging(store.dispatch))
    // 此时返回了上一个dispatch的函数作为wrapCrashReport的next参数
    // wrapCrashReport(dispatchAndLog)
    // 最后返回最终的dipatch
    return {
      ...store,
      dispatch
    }
  }
}
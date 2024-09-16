import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const App = () => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    const subscription = store.subscribe(() => {
      setState(store.getState())
    });

    return () => subscription()
  }, [])


  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }



  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok} </div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
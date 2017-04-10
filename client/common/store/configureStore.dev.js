import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

export default function configureStore(preloadedState) {
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
          applyMiddleware(thunk),
          DevTools.instrument()
        //  compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
        )
    )

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')

            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}

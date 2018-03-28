/*======================================
= Needed for React:
========================================*/
import React from 'react';
import ReactDOM from 'react-dom';

/*======================================
= Application state, actions, and view
= (inspired by Hyperapp sample)
========================================*/

const initState = { count: 0 }

const actions = {
    increase: (value) => (state) => ({ count: state.count + value }),
    decrease: (value) => (state) => ({ count: state.count - value }),
}

const myview = (state, actions) => (
    <div>
        <h1>Hyperapp API demo on React</h1>
        <button onClick={() => actions.decrease(1)}>-1</button>
        <b>{state.count}</b>
        <button onClick={() => actions.increase(1)}>+1</button>
    </div>
)

/*======================================
= Start render (React DOM)
========================================*/

startViewRenderReactDOM(initState, actions, myview, document.getElementById('root'))

/*==========================================
= Rendering utility function for React DOM
= FUTURE TODO extract into utility package
============================================*/

function startViewRenderReactDOM(initState, actions, myview, elem) {
    const render = (s, a) => ReactDOM.render(myview(s, a), elem)

    const mystore = { state: initState }

    const a2 = {}

    const myhelper = (af) => (v) => {
        mystore.state = af(v)(mystore.state)
        render(mystore.state, a2)
    }

    // actions.keys().map( (k) => a2[k] = myhelper(actions[k]) )
    for (let prop in actions) a2[prop] = myhelper(actions[prop])

    render(mystore.state, a2)
}


/*======================================
= Needed for React:
========================================*/
import React from 'react';
import ReactDOM from 'react-dom';

/*======================================
= Initial state
= (inspired by Hyperapp sample)
========================================*/

const initState = { count: 0 }

/*======================================
= Actions (inspired by Hyperapp sample)
========================================*/

const actions = {
    increase: (value) => (state) => ({ count: state.count + value }),
    decrease: (value) => (state) => ({ count: state.count - value }),
}

/*======================================
= Possible JSX view function
= (not used in this demo version):
= --------------------------------------
const myview = (state, actions) => (
    <div>
        <h1>Hyperapp API demo on React</h1>
        <button onClick={() => actions.decrease(1)}>-1</button>
        <b>{state.count}</b>
        <button onClick={() => actions.increase(1)}>+1</button>
    </div>
)
========================================*/

/*======================================
= View using Hyperscript
= (inspired by Hyperapp sample)
========================================*/

const h = React.createElement

const myview = (state, actions) =>
    h("div", {},
        h("h1", {}, "Hyperapp API demo on React"),
        h("button", { onClick: () => actions.decrease(1) }, "-1"),
        h("b", {}, state.count),
        h("button", { onClick: () => actions.increase(1) }, "+1"),
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


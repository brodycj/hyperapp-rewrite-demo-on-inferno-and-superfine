/*======================================
= Needed for Ultradom:
========================================*/
import { h, patch } from "ultradom"

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
        <h1>Hyperapp API demo on Ultradom</h1>
        <button onclick={() => actions.decrease(1)}>-1</button>
        <b>{state.count}</b>
        <button onclick={() => actions.increase(1)}>+1</button>
    </div>
)
========================================*/

/*======================================
= View using Hyperscript
= (inspired by Hyperapp sample)
========================================*/

const myview = (state, actions) =>
    h("div", {},
        h("h1", {}, "Hyperapp API demo on Ultradom"),
        h("button", { onclick: () => actions.decrease(1) }, "-1"),
        h("b", {}, state.count),
        h("button", { onclick: () => actions.increase(1) }, "+1"),
    )

/*======================================
= Start render (Ultradom)
========================================*/

startViewRenderUltradom(initState, actions, myview)

/*==========================================
= Rendering utility function for Ultradom
= FUTURE TODO extract into utility package
============================================*/

function startViewRenderUltradom(initState, actions, view) {
    const myViewState = { element: null }

    const renderViewPatch = (s, a) => patch(view(s, a), myViewState.element)

    const mystore = { state: initState }

    const a2 = {}

    const myhelper = (af) => (v) => {
        mystore.state = af(v)(mystore.state)
        renderViewPatch(mystore.state, a2)
    }

    // actions.keys().map( (k) => a2[k] = myhelper(actions[k]) )
    for (let prop in actions) a2[prop] = myhelper(actions[prop])

    myViewState.element = renderViewPatch(mystore.state, a2)

    document.body.appendChild(myViewState.element)
}

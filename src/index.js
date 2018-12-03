/*======================================
= Needed for Inferno
========================================*/
import { createElement } from 'inferno-create-element'
import { render } from 'inferno'

/*======================================
= Needed for Ultradom
========================================*/
import { h, patch } from 'ultradom'

/*======================================
= JSX element on Inferno
========================================*/
const elem = createElement
/** @jsx elem */

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
= JSX view function (React API)
========================================*/
const viewOnReactAPI = (state, actions) => (
    <div>
        <h1>Hyperapp API demo on Inferno (React API)</h1>
        <button onClick={() => actions.decrease(1)}>-1</button>
        <b>{state.count}</b>
        <button onClick={() => actions.increase(1)}>+1</button>
    </div>
)

/*======================================
= View on Ultradom using Hyperscript
= (inspired by Hyperapp sample)
========================================*/

const viewOnUltradom = (state, actions) =>
    h("div", {},
        h("h1", {}, "Hyperapp API demo on Ultradom"),
        h("button", { onclick: () => actions.decrease(1) }, "-1"),
        h("b", {}, state.count),
        h("button", { onclick: () => actions.increase(1) }, "+1"),
    )

/*======================================
= Start render on Inferno (React API)
========================================*/

startViewRenderReactAPI(initState, actions, viewOnReactAPI, document.getElementById('root'))

/*======================================
= Start render (Ultradom)
========================================*/

startViewRenderUltradom(initState, actions, viewOnUltradom, document.body)

/*==========================================
= Rendering utility function specialized
= for Inferno (React API)
= FUTURE TODO: migrate to npm package
============================================*/

function startViewRenderReactAPI(initState, actions, view, elem) {
    const renderView = (s, a) => render(view(s, a), elem)

    startViewRender(initState, actions, view, renderView, renderView)
}

/*==========================================
= Rendering utility function specialized
= for Ultradom
= FUTURE TODO: migrate to npm package
============================================*/

function startViewRenderUltradom(initState, actions, view, containerElement) {
    const myViewState = { element: null }

    const renderViewPatch = (s, a) => patch(view(s, a), myViewState.element)

    const renderFirstViewPatch = (s, a) => {
        myViewState.element = renderViewPatch(s, a)

        containerElement.appendChild(myViewState.element)
    }

    startViewRender(initState, actions, view, renderFirstViewPatch, renderViewPatch)
}

/*==========================================
= General view render utility function
= TODO: migrate to npm package
============================================*/

function startViewRender(initState, actions, view, renderFirstViewPatch, renderViewPatch) {
    const mystore = { state: initState }

    const a2 = {}

    const myhelper = (af) => (v) => {
        mystore.state = af(v)(mystore.state)
        renderViewPatch(mystore.state, a2)
    }

    // actions.keys().map( (k) => a2[k] = myhelper(actions[k]) )
    for (let prop in actions) a2[prop] = myhelper(actions[prop])

    renderFirstViewPatch(mystore.state, a2)
}

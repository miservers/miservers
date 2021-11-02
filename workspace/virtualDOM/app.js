import {h, Node} from './h.js';
import {mount} from './mount.js';

let vDiv1 = h('div', {id:'div1'}, 'Hello')

let vDiv2 = h('div', {id:'div2'}, 'World')

let vApp = h('div', {id:'vapp'}, [vDiv1, vDiv2])

const _app = document.getElementById("app")

//mount (vDiv1, _app)
mount (vApp, _app)
//_app.innerHTML = "Hi"
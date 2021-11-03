import {h, Node} from './h.js';
import {mount} from './mount.js';

let vH1 = h('h1', {id:'myh1'}, 'Hello World')

let vHr = h('hr', {id:'myhr1'})

let vDiv1 = h('div', {id:'div1'}, 'this is a demo for virtual dom')

let vApp = h('div', {id:'vapp'}, [vH1, , vHr, vDiv1])

const _app = document.getElementById("app")

//mount (vDiv1, _app)
mount (vApp, _app)
//_app.innerHTML = "Hi"
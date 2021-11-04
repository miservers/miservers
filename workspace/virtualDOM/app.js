// @CR @AR 10/2021
//

import {VNode, createTextVNode, createVNode} from './vnode.js';
import {mount} from './mount.js';

/* Virtual DOM
              app 
           /   \   \  \
          h2   ul  hr div
              / \
             li li
*/

let vh2 = createTextVNode('h2', {id:'h1'}, 'Villes')

let vli1 = createTextVNode('li', {id:'li1'}, 'Casablanca')
let vli2 = createTextVNode('li', {id:'li1'}, 'Rabat')
let vul = createVNode('ul', {id:'ul'})
vul.appendChild(vli1).appendChild(vli2)

let vHr = createVNode('hr', {id:'myhr1'})

let vDiv1 = createTextVNode('div', {id:'div1'}, 'this is a demo for virtual dom')

let vApp = createVNode('div', {id:'vapp'})
vApp.appendChild(vh2).appendChild(vul).appendChild(vHr).appendChild(vDiv1)


const _app = document.getElementById("app")

mount (vApp, _app)   //mount vnode on real dom


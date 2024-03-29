// @CR @AR 10/2021
//

import {VNode, createTextVNode, createVNode} from './vnode.js';
import {mount} from './mount.js';
import {diff} from './diff.js'

/* Construct the Virtual DOM
              app 
           /   \   \  \
          h2   ul  hr div
              / \
             li li
*/

let vh2 = createTextVNode('h2', {id:'h2', style:"color:red"}, 'Villes')

let vli1 = createTextVNode('li', {id:'li1'}, 'Casablanca')
let vli2 = createTextVNode('li', {id:'li2'}, 'Rabat')
let vli3 = createTextVNode ('li', {id:'li3'}, 'Pekin')
let vul = createVNode('ul', {id:'ul'})
vul.appendChild(vli1).appendChild(vli2).appendChild(vli3)

let vHr = createVNode('hr', {id:'myhr1'})

let vDiv1 = createTextVNode('div', {id:'div1'}, 'Demo for virtual dom from scratch!')

let vApp = createVNode('div', {id:'vapp'})
vApp.appendChild(vh2).appendChild(vul).appendChild(vHr).appendChild(vDiv1)

console.log(vApp)

//mount vnode on real dom
const _app = document.getElementById("app")

mount (vApp, _app)   


// Diff and Patch Test
setTimeout(()=> {
    const clonedVApp = vApp.clone() 
    let vDiv2 = createTextVNode('div', {id:'div2'}, 'Diffing TEST!')
    vApp.replaceChild(vDiv1, vDiv2)
    diff(clonedVApp, vApp)
}, 5000)

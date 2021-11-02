import {Node} from './h.js'

// mount a virtual node on the dom node
// See <https://dom.spec.whatwg.org/#interface-document>
//
const mount = (vNode, _node) => {
    let _el = document.createElement(vNode.tag) 
    console.log(vNode)
    console.log(_el)
    if (typeof vNode.children == 'string' || typeof vNode.children == 'number') {
        _el.innerHTML = vNode.children
        _node.appendChild(_el)
    }
    else if (typeof vNode.children == 'object')
        vNode.children.forEach(vChild => mount(vChild, _el))    
}

export {mount}
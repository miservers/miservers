// @CR @AR 10/2021
//
// mount a virtual node on the real dom node
// See <https://dom.spec.whatwg.org/#interface-document>
//
import {VNode, createTextVNode, createVNode} from './vnode.js'

const mount = (vnode, _node) => {
    let _el = document.createElement(vnode.tag) 
     if (vnode.nodeType == VNode.TEXT_NODE) {
        _el.innerHTML = vnode.data
    }
    else if (vnode.childNodes != null)
        vnode.childNodes.forEach(vChild => mount(vChild, _el))    
    
    _node.appendChild(_el)
    
}

export {mount}
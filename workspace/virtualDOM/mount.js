// @CR @AR 10/2021
//
// mount a virtual node on the real dom node
// See <https://dom.spec.whatwg.org/#interface-document>
//
import {VNode, createTextVNode, createVNode} from './vnode.js'

const mount = (vnode, _node) => {
    let _el = document.createElement(vnode.tag) 
    
    // set _el.attributes = vnode.props
    let vprops = vnode.props
    Object.keys(vprops).forEach (attr => {
        let value = vprops[attr]
        _el.setAttribute(attr, value) 
    })

    // mount vnode on the real dom
    if (vnode.nodeType == VNode.TEXT_NODE) {
        _el.innerHTML = vnode.data
    }
    else if (vnode.childNodes != null)
        vnode.childNodes.forEach(vChild => mount(vChild, _el))    
    
    _node.appendChild(_el)
    vnode._el = _el
    
}

const unmount = (vnode) => {
    let _el = vnode._el
    console.log("B", _el)
    _el.parentNode.removeChild(_el)
    console.log("A", _el)

}

export {mount, unmount}
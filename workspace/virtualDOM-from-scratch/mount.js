// @CR @AR 10/2021

import {VNode, createTextVNode, createVNode, NODE_TYPE} from './vnode.js'

// mount a virtual node on the real dom node. it's a recursive function
// See <https://dom.spec.whatwg.org/#interface-document>
// params :
//   vnode : virtual node
//   _node : real DOM node
const mount = (vnode, _node) => {
    let _el = document.createElement(vnode.tag) 
    
    // set _el.attributes = vnode.props
    let props = vnode.props
    Object.keys(props).forEach (attr => {
        let value = props[attr]
        _el.setAttribute(attr, value) 
    })

    // mount vnode on the real dom
    if (vnode.nodeType == NODE_TYPE.TEXT) {
        _el.innerHTML = vnode.data
    }
    else if (vnode.childNodes != null)
        vnode.childNodes.forEach(vChild => mount(vChild, _el))    
    
    _node.appendChild(_el)
    vnode._el = _el
    
}


const unmount = (vnode) => {
    let _el = vnode._el
    _el.parentNode.removeChild(_el)
}

export {mount, unmount}
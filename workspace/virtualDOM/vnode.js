// @CR @AR 10/2021
//
// This file define Virtual Node structure 
// see <https://dom.spec.whatwg.org/#node>

export const ELEMENT_NODE = 1;
export const ATTRIBUTE_NODE = 2;
export const TEXT_NODE = 3;
  
class VNode {
    static ELEMENT_NODE = 1;   // Node types
    static ATTRIBUTE_NODE = 2;
    static TEXT_NODE = 3;
  
    constructor (tag, props, nodeType,  data=null) {
        this.tag = tag
        this.props = props
        this.nodeType = nodeType
        this.data = data
        this.childNodes = new Array() // array of vnodes
        this.parent = 

        this._el = null   // reel DOM element 
    }

    appendChild = (vnode) => {
        this.childNodes.push(vnode) 
        return this
    }
    removeChild = (vnode) => {
        let idx = this.childNodes.indexOf(vnode)
        this.childNodes.splice(idx,1)
        return this
    }
    replaceChild = (old, vnode) => {
        let idx = this.childNodes.indexOf(old)
        this.childNodes[idx] = vnode
        return this
    }


}

// Create Text or Element virtual node
//   return:  the virtual node
const createTextVNode = (tag, props, data) => new VNode(tag, props, TEXT_NODE, data)

const createVNode = (tag, props) => new VNode(tag, props, ELEMENT_NODE)

export {VNode, createTextVNode, createVNode}
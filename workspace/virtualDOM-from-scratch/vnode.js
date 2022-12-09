// @CR @AR 10/2021
//
// This file define Virtual Node structure 
// see <https://dom.spec.whatwg.org/#node>
  
class VNode {
    
    constructor (tag, props, nodeType,  data=null) {
        this.tag = tag            // html tag, eg: div, ul, li, h2 etc
        this.props = props        // Object. format {key1:value1, key2:value2,...}  
        this.nodeType = nodeType  // NODE_TYPE enum
        this.data = data          // to be innerHTML in case of text element
        this.childNodes = new Array() // array of vnodes
        this.parent = null

        this._el = null   // reel DOM element to be created for this vinode
    }

    appendChild = (vnode) => {
        this.childNodes.push(vnode) 
        vnode.parent = this
        return this
    }

    removeChild = (vnode) => {
        let idx = this.indexOfChild(vnode)
        this.childNodes.splice(idx,1)
        vnode.parent = null
        return this
    }
    
    replaceChild = (old, vnode) => {
        let idx = this.indexOfChild(old)
        this.childNodes[idx] = vnode
        old.parent = null
        return this
    }
    
    isEqual = (vnode) => {
        return (this.tag == vnode.tag && this.nodeType == vnode.nodeType &&
                this.data == vnode.data) //must be completed!
    }
    
    clone = () => {
        let cloned = Object.assign({}, this) 
        cloned.childNodes = new Array()
        this.childNodes.forEach((child, idx) => 
                                    cloned.childNodes[idx] = child.clone())
        return cloned
    }
    
    indexOfChild = (child) => {
        let index = -1;
        this.childNodes.forEach((e, idx) => {if (e.props.id == child.props.id)  index = idx}) 
        return index
    }

}

const NODE_TYPE = {ELEMENT:1, ATTRIBUTE:2, TEXT:3}

// Create Text or Element virtual node
//   return:  the virtual node
const createTextVNode = (tag, props, data) => new VNode(tag, props, NODE_TYPE.TEXT, data)

const createVNode = (tag, props) => new VNode(tag, props, NODE_TYPE.ELEMENT)

export {VNode, createTextVNode, createVNode, NODE_TYPE}
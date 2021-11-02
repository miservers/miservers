class Node {
    constructor (tag, props, children) {
        this.tag = tag
        this.props = props
        this.children = children
    }
}

// Create virtual node
//   return:  the virtual node
let h = (tag, props, children) => new Node(tag, props, children)


export {h, Node}
// @AR 2021
import {VNode} from './vnode.js' 
import {mount, unmount} from './mount.js'

// Diffing old and new vnodes, and patching the DOM if there is
// a difference between the two vnodes
// parameters: old vnode, new vnode
//
const diff = (oldVN, newVN) => {
    if (!oldVN.isEqual(newVN)) {
        mount (newVN, oldVN._el.parentElement)
        unmount (oldVN)
    }
    else // if they are identique,  check children
        oldVN.childNodes.forEach ((oldChild, idx) => 
                                    diff(oldChild, newVN.childNodes[idx]))
}


export {diff}
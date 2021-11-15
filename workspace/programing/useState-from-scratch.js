
const useState = (initVal) => {
    let _state = initVal
    let state = () => _state
    let setState = (newState) => {
        _state = newState
    }
    return [state, setState]
}

let [count, setCount] = useState(1)

console.log(count())
setCount(2);
console.log(count())
console.log(count)


const React = () => {
    let state =0
}
React.useState = (initVal) => {
        React.state = initVal
        let setState = (newState) => {
            React.state = newState
        }
        return [React.state, setState]
    }

let [count, setCount] = React.useState(1)

console.log(count)
setCount(2);
console.log(count)


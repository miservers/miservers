// This an simple implementation of React useState like hook. Use an array of states 
// to extend useState for many calls,
//
// See this exellent article
//  https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/

// Delaring React using MODULE  Pattern 

const React = (function(){
  let self = {} // reference to this module
  let state

  // public functions
  function render (Component)  {
    const comp = Component()
    comp.render() 
    console.log('state: ', state)
    return comp
  }

  function useState(initValue) {
    state = state || initValue
    function setState(newState) {
      state = newState;
    }
    return [state, setState]
  }

  self.render = render
  self.useState = useState
  return self 

})()


const Counter = ()=>{
  const [count, setCount] = React.useState(1)
  
  return {
    click: () => {setCount(count+1)},
    render: () => console.log('render: ', {count})
  }
}

let app = React.render(Counter)
app.click()
app = React.render(Counter)
app.click()
app = React.render(Counter)

//React.render(C)

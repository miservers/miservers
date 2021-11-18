// Delaring React using MODULE  Pattern 

const React = (function(){
  let self = {} // reference to thismodule
  let state

  // public functions
  self.render  = function (Component)  {
        const comp = Component()
        comp.render() 
        console.log('state: ', state)
        return comp
  }

  self.useState = function (initValue) {
        state = state || initValue
        function setState(newState) {
          state = newState;
        }
        return [state, setState]
  }
 
  return self   
})()


const Counter = ()=>{
  let [count, setCount] = React.useState(1)
  
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

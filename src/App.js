import React from 'react'  
import './App.css'

const App = props => (  
  <div className="App">
    <div className="App-header">
      <h2>Welcome to Widget Reactory</h2>
    </div>
    <section className="App-body">
      {props.children}
    </section>
  </div>
)



export default App
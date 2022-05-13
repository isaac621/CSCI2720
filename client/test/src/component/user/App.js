import React, {useState} from "react";
import{BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/user/table" element={<UserTable/>} />
            </Routes>
          </div>
        </BrowserRouter>
    );
}


/*
class Data extends React.Component {
  
  constructor() {
    super();
    this.state = { jwt: localStorage.getItem('jwt')}
  }

  fetchData() {
    fetch(`http://localhost:3000/users/locations`, {
        headers:{
            'Authorization': `Bearer ${this.state.jwt}`
        }
    })
    .then(res => res.json())
    .then(res => {    
      localStorage.setItem('data', res)
      console.log(localStorage.getItem('data'))
    })
  }

  render () {
    return (
      <div>
        {this.fetchData()}
      </div>
    )
  }
}
*/


export default App;
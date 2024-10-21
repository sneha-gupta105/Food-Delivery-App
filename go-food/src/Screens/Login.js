import React,{useState} from 'react'
import {Link, useNavigate} from "react-router-dom"

function Login() {
  const [credentials, setCredentials] = useState({email:"", password:"",})
  let navigate = useNavigate();
  const changeHandler = (event) => {
      setCredentials({...credentials, [event.target.name]:event.target.value})
  }

  const handleSubmit = async(e) => {
      e.preventDefault();         //preventDefault is an example of synthetic event
      console.log(JSON.stringify({email: credentials.email, password: credentials.password}))
      const response = await fetch("http://localhost:5000/api/loginuser",{
          method:'POST',
          headers:{
              'Content-Type' : 'application/json'
          },
          body:JSON.stringify({
              email: credentials.email, 
              password: credentials.password
          })
      });
      const json = await response.json();
      console.log(json);

      if(!json.success){
          alert("Enter valid credentials")
      }
      else{
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate('/');

      }
  }
  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={changeHandler} id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={changeHandler} id="exampleInputPassword1"/>
          </div>

          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to='/createuser' className='m-3 btn btn-danger'>New user</Link>
        </form>
      </div>
    </div>
  )
}

export default Login

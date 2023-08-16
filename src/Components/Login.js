import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"

const Login = (props) => {
  const [credentials,setCredentials]=useState({email:"",password:""});
  const navigate=useNavigate();
  const handleSubmit=async (e)=>{
   e.preventDefault();
   const response = await fetch(`http://127.0.0.1:50/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email:credentials.email,password:credentials.password}),
  });
  let json = await response.json();
  console.log(json);
  if(json.success){
    localStorage.setItem("token",json.authToken);
    props.showAlert("You are logged in","success");
    navigate("/");
  }
  else{
    props.showAlert("Invalid credentials","danger");
  }
  }
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
   }
  return (
    <div className='mt-3'>
      <h2>Login to continue to INotebook</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange}  value={credentials.password} id="password" name='password'/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login

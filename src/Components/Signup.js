import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"

const Signup = (props) => {
  const navigate=useNavigate();
  const [credentials, setcredentials] = useState({name:"",email:"",password:"",Cpassword:""});
  const onChange=(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value})
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:50/api/auth/createUser`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}),
   });
   let json = await response.json();
   console.log(json);
   if(json.success){
     localStorage.setItem("token",json.authToken);
     navigate("/");
     props.showAlert("Account created successfully","success");
    }
   else{
    props.showAlert("Invalid credentials","danger");
  }}
  return (
    <div className='container mt-2'>
      <h2 className='my-2'>Create an account to use to INotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Enter your Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" minLength={5} required/>
  </div>
  <div className="mb-3">
  <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" onChange={onChange} id="password" minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="Cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name="Cpassword" onChange={onChange} id="Cpassword" minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup

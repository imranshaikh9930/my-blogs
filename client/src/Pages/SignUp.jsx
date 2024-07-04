import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const SignUp = () => {
  const navigate = useNavigate();
    const [name,setName] =  useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async(e)=>{
        
        e.preventDefault();

        const resp = await fetch("http://localhost:8080/register",{
           method:"POST",
           body:JSON.stringify({name,email,password}),
           headers:{"content-type":"application/json"}

        })
        const data =await resp.json();
        toast.success("Registser Sucessfully", {})
        navigate("/login")
        // console.log(data);
    }   

  return (
    <form onSubmit={handleSubmit} className='register'>
        <h1>Register</h1>
    <input type="text" placeholder='name' value={name} onChange={(e)=>setName(e.target.value)} />
    <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
    <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
    <button>Register</button>
</form>
  )
}

export default SignUp
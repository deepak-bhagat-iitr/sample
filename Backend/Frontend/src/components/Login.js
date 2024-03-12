import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Login() {

    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            axios.post(`${window.location.origin}/`,{
                email:email,
                password:password

            })
            .then(res=>{
                console.log(res)
                if(res.data=="exist"){
                    history("/home",{state:{email:email}})
                }
                else if(res.data=="notexist"){
                    alert("User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }

    return (
        <div className="container">

            <h1>Login</h1>

            <form action="POST">
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" required/>
                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" required/>
                <input type="submit" onClick={submit} />

            </form>

            <div class="register-link">
                Don't have an account? <Link to="/signup">Signup Page</Link>
            </div>


        </div>
    )
}

export default Login
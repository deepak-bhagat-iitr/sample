import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Login() {
    const history = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e) {
        e.preventDefault();
        if (email == "" || password == "") {
            alert("invalid");
            return;
        }
        await axios.post(`${window.location.origin}/signup`, {
            email: email,
            password: password
        })
            .then(res => {
                if (res.data == "exist") {
                    alert("Email already exists")
                }
                else if (res.data == "notexist") {
                    history("/home", { state: { email: email } })
                }
            })
            .catch(e => {
                alert("Can't signup")
                console.log(e);
            })
    }


    return (
        <div class="signup-container">

            <h1>Signup</h1>

            <form action="POST">
                <div class="form-group">
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
                </div>
                <div class="form-group">
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                </div>
                <div class="form-group">
                    <input type="submit" onClick={submit} />
                </div>
            </form>

            <p>Already have an account?<Link class="login-link" to="/">Login Page</Link></p>



        </div>
    )
}

export default Login
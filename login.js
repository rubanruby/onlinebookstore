import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"


export default function Login()
{
    const [username, setUsername] =useState('')
    const [password, setPasword] =useState('')
    const myNavigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('user')!==null)
            myNavigate('/home')
    },[])
    
    function formSubmit(e){
        e.preventDefault();

        axios.get('http://localhost:8081/api/account/'+username)
        .then((res) => {
            // if(res.data.username === "admin" && res.data.password === "Admin@123")
            // {
            //     localStorage.setItem('user',JSON.stringify(res.data));
            //     myNavigate('/admin-dashoard')
            // }
            if(res.data.username === "admin" && res.data.password === "Admin@123")
            {
                localStorage.setItem('user',JSON.stringify(res.data));
                myNavigate('/admin-dashboard')
            }
            else if(res.data.username===username && res.data.password===password){
                localStorage.setItem('user',JSON.stringify(res.data));
                myNavigate('home')
                // console.log(user);
            }
            else
            alert('Username/Password incorrect')
        })
        // console.log(username, password);
        
    }
    return(
        <>
            <div className="container">
                <h2 style={{textAlign: 'center'}}>Books Galaxy</h2>
                <h3 style={{textAlign:'center'}}>Login</h3>
                <form onSubmit={formSubmit} className="container w-50">
                    <div className="form-group">
                        <input type="text" placeholder="Username" className="form-control"onChange={(e)=> setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Password" className="form-control"onChange={(e)=> setPasword(e.target.value)} />
                    </div>

                    <button className="btn btn-primary mr-2">Login</button>
                    <button className="btn btn-danger" type="reset">Cancel</button>
                    <Link to="/signup" className="btn btn-link">Create Account</Link>
                </form>

            </div>
        </>
    )
}
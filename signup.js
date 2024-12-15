import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";


export default function Signup()
{
    const [user, setUser] = useState({})

    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const myNavigate=useNavigate()

    function handleChange(e)
    {
        setUser({...user, [e.target.name]: e.target.value});
    }

    function formSubmit(e)
    {
        e.preventDefault();
        
        axios.get('http://localhost:8081/api/account/'+user.username)
        .then((res)=> {         
            // console.log(user); 
            let isValid=true;  
            if(res.data !== null){
                setUsernameError('Username already taken')                
                isValid=false;
            }                            
            if(user.password !== user.confirmpassword){
                setPasswordError('Password and Confirm password must be same')
                isValid=false;
            }

            if(isValid){
                delete user.confirmpassword
                // console.log(user);
                axios.post('http://localhost:8081/api/account', user)
                .then((res)=> {
                    if(res.data.username === user.username){
                        alert('Registered successfully...')
                        myNavigate('/')
                    }
                })
            }
        })
    }


    return(
        <>
            <div className="container">
                <h2 style={{textAlign:'center'}}>Books Galaxy</h2>
                <h3 style={{textAlign:'center'}}>Signup</h3>
                <form  className="container w-50" onSubmit={formSubmit}>                    
                    <div className="form-group ">
                        <input type="text" placeholder="Username" name="username" className="form-control" onChange={handleChange} required/>                        
                        { usernameError && <p style={{color:'red'}}>{usernameError}</p> }
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Password" name="password" className="form-control"  onChange={handleChange} required/>
                    </div> 
                    <div className="form-group">
                        <input type="password" placeholder="Confirm Password" name="confirmpassword" className="form-control" onChange={handleChange} required />
                        { passwordError && <p style={{color:'red'}}>{passwordError}</p> }
                    </div>                  
                    <div className="form-group">
                        <input type="text" placeholder="Full Name" name="fullName" className="form-control"  onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email" name="email" className="form-control"  onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <select className="form-control" name="gender"  onChange={handleChange} required>
                            <option disabled selected>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <button className="btn btn-primary mr-2">Signup</button>
                    <button className="btn btn-danger" type="reset">Cancel</button>
                  
                </form>
                
            </div>
        </>
    )
}
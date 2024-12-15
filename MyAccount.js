import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"


export default function MyAccount()
{
    const myNavigate = useNavigate()

    const [user, setUser] = useState({})

    useEffect(()=>{
        if(localStorage.getItem('user')===null)
            myNavigate('/')
        else{
            let fetchedUser ={}
            const uname = JSON.parse(localStorage.getItem('user'))['username']
            console.log(uname);
            axios.get('http://localhost:8081/api/account/'+uname)
            .then((res) => setUser(res.data))
        }
        
    },[])

    function logout()
    {
        localStorage.clear();
        myNavigate('/')
    }

    
    function formSubmit(e){
        e.preventDefault();
        // console.log(user);

        axios.put('http://localhost:8081/api/account', user)
        .then((res)=> {
            // console.log(res.data);
            if(res.data.username === user.username)
                alert('updated...')            
        })
        
    }

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value});
        // console.log(e.target.name);
    }
    return(
        <>
            <nav className="navbar navbar-light bg-light">
                <Link to={(user.username!=='admin')?'/home':'/admin-dashboard'} className="navbar-brand mb-0 h1">Book Galaxy</Link>
                
                <div>
                   {
                    (user.username!=='admin')&& <Link to="/orders" className="btn">My Orders</Link>
                   }
                    <Link to="/my-account">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/></svg>                    
                    </Link>
                   {
                     (user.username!=='admin')&& 
                    <Link to="/cart" className="btn btn-link"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>                    </svg>
                    </Link>
                   }
                    
                    <button className="btn btn-warning" onClick={logout}>Logout</button>    
                </div>
            </nav>
            <div className="text-center mt-5">
                <h3>My Account</h3>
                <form className="container w-25" onSubmit={formSubmit}>                   
                        <label>Username :</label><span className="ml-5">{user.username}</span>
                        {/* <label>Username :</label><span className="ml-5">{user.username}</span> */}
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" onChange={handleChange} placeholder="password" value={user.password} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="fullName" onChange={handleChange} placeholder="Name" value={user.fullName} />
                    </div>
                    <div className="form-group">
                       <select className="form-control" name="gender" value={user.gender} onChange={handleChange}>                            
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                       </select>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" name="email" onChange={handleChange} placeholder="Email" value={user.email} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="address" onChange={handleChange} placeholder="Addres" value={user.address} />
                    </div>
                    <button type="submit" className="btn btn-info">Update</button>
                </form>
            </div>
        </>
    )
}
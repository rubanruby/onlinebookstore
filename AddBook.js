import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function AddBook()
{
    
    const myNavigate = useNavigate();

    const [newBook, setNewBook] = useState({})

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user===null)
            myNavigate('/')         
    },[])

    function logout()
    {
        localStorage.clear();
        myNavigate('/')
    }
    function handleChange(e){
        setNewBook({...newBook, [e.target.name]: e.target.value})
    }

    function formSubmit(e){
        e.preventDefault();
        // console.log(newBook);

        axios.post('http://localhost:8081/api/book',newBook)
        .then((res)=>{
            if(res.data.bookId === newBook.bookId){
                alert('added..'); //console.log(res.data);
                e.target.reset();
            }
            else
                alert('Book alredy exist')
                // alert()
        })
    }
    return(
        <>
         <nav className="navbar navbar-light bg-light">
                <Link to="/home" className="navbar-brand mb-0 h1">Book Galaxy</Link>
                <div>
                    <Link to="/my-account">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/></svg>                    
                    </Link>        
                    <button className="btn btn-warning" onClick={logout}>Logout</button>
                </div>               
            </nav>  

            <div>
                <h4 className="text-center mt-3">Add New Book</h4>

                <form className="container w-50" onSubmit={formSubmit}>
                     <div className="form-group">
                        <input type="text" className="form-control" name="bookId" onChange={handleChange} placeholder="bookId" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="bookName" onChange={handleChange} placeholder="bookName" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="authorId" onChange={handleChange} placeholder="authorId" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="authorName" onChange={handleChange} placeholder="authorName" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="category" onChange={handleChange} placeholder="category"  />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="imageUrl" onChange={handleChange} placeholder="Image URL"  />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="description" onChange={handleChange} placeholder="description" />
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" name="price" onChange={handleChange} placeholder="Price"  />
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" name="stockCount" onChange={handleChange} placeholder="Count"  />
                    </div>
                    <input type="submit" value="Add Book" className="btn btn-success mr-3" />
                    <input type="reset" value="cancel" className="btn btn-danger" />
                </form>
            </div>
        </>
    )
}
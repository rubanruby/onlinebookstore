import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


export default function EditBook()
{
    
    const myNavigate = useNavigate();
    const {id} = useParams();

    const [bookData, setBookData] = useState({})

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user===null)
            myNavigate('/')    
        else{
            axios.get('http://localhost:8081/api/book/'+id)
            .then((res)=> setBookData(res.data))
        }     
    },[])

    function logout()
    {
        localStorage.clear();
        myNavigate('/')
    }
    function handleChange(e){
        setBookData({...bookData, [e.target.name]: e.target.value})
    }

    function formSubmit(e){
        e.preventDefault();
        // console.log(bookData);

        axios.put('http://localhost:8081/api/book',bookData)
        .then((res)=>{
            if(res.data.bookId === bookData.bookId){
                alert('uddated..'); //console.log(res.data);
                e.target.reset();
            }
            
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
                <h4 className="text-center mt-3">Update Book</h4>

                <form className="container w-50" onSubmit={formSubmit}>
                     <div className="form-group">
                        <input type="text" className="form-control" value={bookData.bookId} name="bookId" onChange={handleChange} placeholder="bookId" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" value={bookData.bookName} name="bookName" onChange={handleChange} placeholder="bookName" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" value={bookData.authorId} name="authorId" onChange={handleChange} placeholder="authorId" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" value={bookData.authorName}  name="authorName" onChange={handleChange} placeholder="authorName" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" value={bookData.category} name="category" onChange={handleChange} placeholder="category"  />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" value={bookData.imageUrl} name="imageUrl" onChange={handleChange} placeholder="Image URL"  />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" value={bookData.description} name="description" onChange={handleChange} placeholder="description" />
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" value={bookData.price} name="price" onChange={handleChange} placeholder="Price"  />
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" value={bookData.stockCount} name="stockCount" onChange={handleChange} placeholder="Count"  />
                    </div>
                    <input type="submit" value="Update Book" className="btn btn-success mr-3" />
                    <Link to="/" className="btn btn-secondary">Go Back</Link>
                </form>
            </div>
        </>
    )
}
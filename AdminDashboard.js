import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";



export default function AdminDashboard()
{

    const [booksData, setBookData] = useState([])

    const myNavigate = useNavigate();

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user===null)
            myNavigate('/')        
        else{
            axios.get('http://localhost:8081/api/books')
        .then((res)=> setBookData(res.data))
        }
    },[])
    
    function logout()
    {
        localStorage.clear();
        myNavigate('/')
    }

    function deleteBook(id)
    {
        axios.delete('http://localhost:8081/api/book/'+id)
        .then((res)=> {
            if(res.data.bookId === id)
                alert('deleted book')
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

            <div className="container-fluid"> 
                <h4 className="text-center"> Admin Dashboard </h4>
                <Link to="/add-book" className="btn btn-primary">Add New Book</Link>
                <table className="table table-striped mt-5">
                    <thead>
                        <tr>
                            <td>Book Id</td>
                            <td>Name</td>
                            <td>AuthorID</td>
                            {/* <td>Author Name</td> */}
                            <td>Category</td>
                            {/* <td>Image URL</td> */}
                            <td width={300}>Desc</td>
                            <td>Price</td>
                            <td>Stock Count</td>                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            booksData.map((book) =>{
                                return <tr>
                                    <td>{book.bookId}</td>
                                    <td>{book.bookName}</td>
                                    <td>{book.authorId}</td>
                                    {/* <td>{book.authorName}</td> */}
                                    <td>{book.category}</td>
                                    {/* <td><img src={book.imageUrl} width={50} height={75}/></td> */}
                                    <td>{book.description}</td>
                                    <td>{book.price}</td>
                                    <td>{book.stockCount}</td>
                                    <td>
                                        <Link to={`/edit-book/${book.bookId}`} className="btn btn-info">Edit</Link>
                                        <button onClick={()=>deleteBook(book.bookId)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
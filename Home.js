import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Home() {

    const myNavigate = useNavigate();
    const [booksData, setBooksData] = useState([])
    

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user===null)
            myNavigate('/')
        else
            getAllBooksAPI()
    },[])

    function getAllBooksAPI(){
        axios.get('http://localhost:8081/api/books')
        .then((res) => {
            // console.log(res.data);
            setBooksData(res.data)
        })
    }

    function logout()
    {
        localStorage.clear();
        myNavigate('/')
    }

    function categoryFilter(e)
    {      
        let filteredData = booksData.filter((book)=> book.category === e.target.value)
        setBooksData(filteredData);
    }
    function authorFilter(e)
    {      
        let filteredData = booksData.filter((book)=> book.authorName === e.target.value)
        setBooksData(filteredData);
    }
    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <Link to="/home" className="navbar-brand mb-0 h1">Book Galaxy</Link>
                
                <div>
                    <Link to="/orders" className="btn">My Orders</Link>
                    <Link to="/my-account">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/></svg>                    
                    </Link>                    
                   
                <Link to="/cart" className="btn btn-link" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg>
                </Link>     
                <button className="btn btn-warning" onClick={logout}>Logout</button>
                </div>
            </nav>

            <div className="d-flex flex-row">
                <div className="filter-container col-2" style={{borderRight:'1px solid #1212'}}>                    
                    <div className="categories mt-5">
                        <h6>Categories</h6>
                        <label>
                            <input type="radio" value="fiction" onChange={categoryFilter} className="mr-2"/>
                            Fiction
                        </label><br></br>
                        <label>
                            <input type="radio" value="historical" onChange={categoryFilter} className="mr-2"/>
                            History
                        </label><br></br>                        
                      </div> 
                    <div className="authors mt-5">
                    <h6>Authors</h6>
                        <label>
                            <input type="radio" value="kalki" onChange={authorFilter} className="mr-2"/>
                            kalki
                        </label><br></br>
                        <label>
                            <input type="radio" value="Sujatha" onChange={authorFilter} className="mr-2"/>
                            Sujatha
                        </label>
                    </div>
                </div>
                <div className="books-container col-10 mt-4">
                    
                    <div className="all-books d-flex flex-row flex-wrap">
                        {
                            booksData.map((book)=>{
                               
                                return (
                                    <div className="" style={{width:'200px', minHeight:'200px'}}>
                                        <Link to={`/book-detail/${book.bookId}`} style={{textDecoration:'none'}}>
                                            <img src={book.imageUrl}  width="150" height="200"/>
                                            <p>{book.bookName}</p>
                                            <p>₹ {book.price}</p>
                                        </Link>                                                                          
                                    </div>
                                )
                            })
                        }
                    </div> 
                </div>
            </div>
        </>
    )
}
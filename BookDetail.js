import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"


export default function BookDetail()
{
  
    const {id} = useParams()

    const myNavigate = useNavigate()

    const [bookData, setBookData] = useState({})    

    useEffect(()=>{      
        if(localStorage.getItem('user')===null)
            myNavigate('/')
        else{
            axios.get('http://localhost:8081/api/book/'+id)
            .then((res)=> setBookData(res.data))
        }        
    },[])

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {        
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    function addToCart(book) {
        setCart((prevCart) => {
            const existingBook = prevCart.find((item) => item.bookId === book.bookId);
            if (existingBook) {
                alert(`${book.bookName} is already in the cart!`);
                return prevCart;
            } else {
                // alert(`${book.bookName} added to the cart!`);
                return [...prevCart, { ...book, quantity: 1, totalPrice: book.price }];
            }
        });
    }

    function increaseQuantity(bookId) {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.bookId === bookId
                    ? {
                        ...item,
                        quantity: item.quantity < item.stockCount ? item.quantity + 1 : item.quantity,
                        totalPrice: (item.quantity < item.stockCount ? item.quantity + 1 : item.quantity) * item.price
                    }
                    : item
            )
        );
    }

    function decreaseQuantity(bookId) {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.bookId === bookId && item.quantity > 1
                    ? {
                        ...item,
                        quantity: item.quantity - 1,
                        totalPrice: (item.quantity - 1) * item.price
                    }
                    : item
            )
        );
    }
    function logout()
    {
        localStorage.clear();
        myNavigate('/')
    }

    const cartItem = cart.find((item) => item.bookId === bookData.bookId);
    const quantity = cartItem ? cartItem.quantity : 0;
    return(
        <>
            <nav className="navbar navbar-light bg-light">
                <Link to="/home" className="navbar-brand mb-0 h1">Book Galaxy</Link>

                <div>
                <Link to="/orders" className="btn">My Orders</Link>
                    <Link to="/my-account">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/></svg>                    
                    </Link> 
                    <Link to="/cart" className="btn btn-link"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>                    </svg>
                    </Link>
                    <button className="btn btn-warning" onClick={logout}>Logout</button>    
                </div>
            </nav>

            <div className="d-flex flex-row mt-5 ml-5">
                <div className="col-4">
                    <img src={bookData.imageUrl} width="300" height="500" />                    
                </div>
                <div className="col-8 book-detail">
                    <h3>{bookData.bookName}</h3>
                    <p>Author : {bookData.authorName}</p>
                    <p>Description: {bookData.description}</p>
                    <p>Stock : {bookData.stockCount}</p>                    

                    <button onClick={() => addToCart(bookData)}>Add to Cart</button>


                        {cartItem && (
                            <div>
                                <button onClick={() => decreaseQuantity(bookData.bookId)}>-</button>
                                <span> {quantity} </span>
                                <button onClick={() => increaseQuantity(bookData.bookId)}>+</button>
                            </div>
                        )} 


                </div>

            </div>
        </>
    )
}
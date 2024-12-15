import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Cart()
{
    const [user, setUser] = useState({})

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const myNavigate =useNavigate()

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        setUser(user)
        if(user===null)
            myNavigate('/')
    },[])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(cart);
    }, [cart]);

    function logout()
    {
        localStorage.clear();
        myNavigate('/')
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

    function deleteItem(id){
        setCart((prevCart) => {
            const newCart = prevCart.filter(item => item.bookId !== id);
            console.log(newCart);
            return newCart; 
        });        
    }
    function confirmOrder()
    {
        let order = {
            username:'',
            address:'',
            mobileNo:0,
            totalPrice:0.0
        };
        order.username = user.username;
        order.address=user.address;
        order.mobileNo=user.mobileNo;
        order.totalPrice=user.subtotal;
        console.log(order);
        
        axios.post('http://localhost:8081/api/order', order)
        .then((res)=> {
            if(res.data.username === user.username){
                alert('Orders will reach u within 7 days');
                setCart(()=> [])
                // myNavigate('/home')
            }

        })
    }
    const subtotal = cart.reduce((total, item) => total + item.totalPrice, 0);
    return (
        <>
             <nav className="navbar navbar-light bg-light">
                <Link to="/home" className="navbar-brand mb-0 h1">Book Galaxy</Link>
                
                <div>
                    <Link to="/orders" className="btn">My Orders</Link>
                    <Link to="/my-account">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/></svg>                    
                    </Link>                    
                    <Link to="/cart" className="btn btn-link"> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                    </Link>
                    <button className="btn btn-warning" onClick={logout}>Logout</button>    
                </div>
            </nav>

            <div className="container">
                <h3 className="mt-3">Cart 
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>                    </svg>
                </h3>
                <table className="table table-striped mt-5">
                    <thead>
                        <tr>
                            <td>Book Id</td>
                            <td>Name</td>
                            <td>Author</td>
                            <td>Image</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item) =>{
                                return(
                                    <tr key={item.bookId}>
                                        <td>{item.bookId}</td>
                                        <td>{item.bookName}</td>
                                        <td>{item.authorName}</td>
                                        <td><img src={item.imageUrl} width={75} height={100}/></td>
                                        <td>{item.price}</td>
                                        <td>                                       
                                            <div>
                                                <button onClick={() => decreaseQuantity(item.bookId)}>-</button>
                                                <span> {item.quantity} </span>
                                                <button onClick={() => increaseQuantity(item.bookId)}>+</button>
                                                <button onClick={() => deleteItem(item.bookId)}>Delete</button>
                                            </div>                                      
                                        </td>
                                        <td>₹ {item.totalPrice}</td>
                                        
                                    </tr>
                                )
                            })                            
                        }
                    </tbody>
                </table>
                <p style={{textAlign:'right'}}>Sub Total :₹ {subtotal}</p>
                { cart.length!==0 && <button onClick={confirmOrder} className="btn btn-primary">Confirm to Proceed</button>}
            </div>
           
        </>
    )
}
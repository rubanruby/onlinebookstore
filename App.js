import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Login from './components/login';
import Home from './components/Home';
import Signup from './components/signup';
import BookDetail from './components/BookDetail';
import Cart from './components/Cart';
import MyOrders from './components/MyOrders';
import MyAccount from './components/MyAccount';
import AdminDashboard from './components/AdminDashboard';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';

function App() {
  return (
    <div>
      
      <Router>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/book-detail/:id' element={<BookDetail />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/orders' element={<MyOrders />}></Route>
          <Route path='/my-account' element={<MyAccount />}></Route>

          <Route path='/admin-dashboard' element={<AdminDashboard />}></Route>
          <Route path='/add-book' element={<AddBook />}></Route>
          <Route path='/edit-book/:id' element={<EditBook />}></Route>
        </Routes>
      </Router>


    </div>
  );
}

export default App;

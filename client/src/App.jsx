import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Layout from './Layout'
import IndexPage from './Pages/IndexPage';
import './App.css'
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import UseContextProvider from './Context/UserContext';
import CreatePost from './Pages/CreatePost';
import PostPage from './Pages/PostPage';
import EditPost from './Pages/EditPost';
// import DeletePost from './Pages/DeletePost';

function App() {
  

  return (
   <>
   <Toaster
    position="top-right"/>
   <UseContextProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index  element={<IndexPage/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path="/post/:id" element={<PostPage/>}/>
        <Route path='/edit/:id' element={<EditPost/>} />
        {/* <Route path='/delete/:id' element={<DeletePost/>} /> */}
        </Route>
      </Routes>
    </Router>
 
    </UseContextProvider>
   </>
  )
}

export default App

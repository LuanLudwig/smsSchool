import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Message from './components/layout/Message';
import Home from './components/pages/Home';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Profile from './components/pages/user/Profile';
import AddStudent from './components/pages/student/AddStudent';
import EditStudent from './components/pages/student/EditStudent';
import Send from './components/pages/send/Send';
import AllStudents from './components/pages/student/AllStudents';



function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Message />
          <Container>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="*" element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/user/profile' element={<Profile />} />
              <Route path='/student/create' element={<AddStudent />} />
              <Route path='/student/edit/:id' element={<EditStudent />} />
              <Route path='/student/all' element={<AllStudents />} />
              <Route path='/send/simple' element={<Send />} />
            </Routes>
          </Container>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

import SignUp from './Components/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import for BrowserRouter
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import io from "socket.io-client";
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';

function App() {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  console.log(authUser);
  const BASE_URL = 'https://backend-chat-application-pwpe.onrender.com';

  useEffect(() => {
    if (authUser) {
      const socket = io(BASE_URL, {
        query: {
          userId: authUser._id
        }
      });
      dispatch(setSocket(socket));

      socket.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser, socket, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

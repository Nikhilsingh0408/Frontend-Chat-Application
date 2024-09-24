import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import io from "socket.io-client";
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';
import HomePage from './Components/HomePage';
import SignUp from './Components/SignUp';
import Login from './Components/Login';

const BASE_URL = 'https://backend-chat-application-pwpe.onrender.com';

// Layout component to wrap all pages
function Layout({ children }) {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      {children}
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <SignUp />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
]);

function App() {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socket = io(BASE_URL, {
        query: {
          userId: authUser._id
        }
      });
      dispatch(setSocket(socket));

      socket.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser, dispatch, socket]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;

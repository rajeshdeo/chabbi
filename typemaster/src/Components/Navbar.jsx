// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { login, logout } from '../Reducer/authActions';
// import LoginForm from '../Pages/LoginForm';
// import SignupForm from '../Pages/SignupForm';
// import { useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.isLoggedIn);
//   const user = useSelector((state) => state.user);
//   const navigate= useNavigate()
//         //console.log(user);
//   const handleLogout = () => {
//     dispatch(logout());
//   };
// //   const handleLogin = () => {
// //     navigate("/login")
// //     // dispatch(login(user.name));
// //   };

//   return (
//     <div className="Navbar">
//       {isLoggedIn ? (
//         <div>
//           <h1>Welcome, {user.name}!</h1>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <div>
//          {/* <button className='logout' onClick={handleLogin}>
//             Login
//           </button> */}
         
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;
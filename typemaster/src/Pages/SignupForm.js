import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../Reducer/authActions';
import { Link, useNavigate } from 'react-router-dom';
import styles from "../Styles/Login.module.css"
const SignupForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation and signup logic here
    const userData = { name, email, password };
    dispatch(signup(userData));
    navigate("/login")
  };

  return (
    <div className={styles.login}>
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      <button type="submit">Sign Up</button>
    </form>
    </div>);
};

export default SignupForm;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../Reducer/authActions';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from "../Styles/Login.module.css"

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation and login logic here
    const credentials = { email, password };
    dispatch(login(credentials));
    navigate("/")
  };

  return (
    <div className={styles.login}>
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
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
      <div >
          Don't have an account? <Link to="/signup">Register</Link> now.
        </div>
      <button type="submit">Login</button>
    </form>
    </div>);
};

export default LoginForm;
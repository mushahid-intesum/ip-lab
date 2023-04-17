import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
`;

const Label = styled.label`
  margin: 10px 0;
  font-size: 18px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  font-size: 16px;
  border-radius: 5px;
  border: none;
`;

const Button = styled.button`
  padding: 10px;
  margin: 10px 0;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  background-color: #0066cc;
  color: white;
`;

function SignInSignUp() {

  const navigate = useNavigate()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleLogin = (event) => {
    event.preventDefault();
    // Here you would send a request to your backend to authenticate the user
    console.log(`Logging in with username: ${username} and password: ${password}`);
    const user = {
      userName: username,
      password: password
    };

    localStorage.setItem("user", user);
    navigate('/home');
  }

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Label htmlFor="username">Username:</Label>
        <Input type="text" id="username" value={username} onChange={handleUsernameChange} />
        <Label htmlFor="password">Password:</Label>
        <Input type="password" id="password" value={password} onChange={handlePasswordChange} />
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}

export default SignInSignUp;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function LogIn() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username === user.username && storedUser.password === user.password) {
      // Permitir que el usuario acceda a la aplicación
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input type="text" name="username" value={user.username} onChange={handleChange} />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" value={user.password} onChange={handleChange} />
        </label>
        {error && <p>{error}</p>}
        <button type="submit">Iniciar sesión</button>
        <NavLink to="/singup" className={"navLink"}>¿No tienes cuenta? ¡Regístrate!</NavLink>
      </form>
    </div>
  )
}

// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

// function LogIn() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const user = users.find(
//             (user) => user.email === email && user.password === password
//         );
//         if (user) {
//             setLoged(true);
//             history.push('/');
//         } else {
//             setError('Email or password is incorrect.');
//         }
//     };

//     // El resto de tu código
// }
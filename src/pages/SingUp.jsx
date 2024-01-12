import React, { useState } from 'react';

function SingUp() {
 const [user, setUser] = useState({ username: '', password: '' });

 const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
 };

 const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del usuario a tu servidor
    // Para simplificar, solo almacenamos los datos en el localStorage
    localStorage.setItem('user', JSON.stringify(user));
 };

 return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input type="text" name="username" value={user.username} onChange={handleChange} />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" value={user.password} onChange={handleChange} />
        </label>
        <button type="submit">Registrarse</button>
      </form>
    </div>
 );
}

// export default SingUp

// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

// function SignUp() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [users, setUsers] = useState([]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newUser = { name, email, password };
//         setUsers([...users, newUser]);
//         setName('');
//         setEmail('');
//         setPassword('');
//     };

//     const history = useHistory();
//     useEffect(() => {
//         if (users.length > 0) {
//             history.push('/');
//         }
//     }, [users]);

//     return (
//         // El resto de tu código
//     );
// }
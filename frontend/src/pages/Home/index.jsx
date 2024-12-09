import { useEffect, useState, useRef } from 'react';
import './style.css';
import Trash from '../../assets/trash.png';
import Edit from '../../assets/editar.png'
import Api from '../../services/api';

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();
  const formRef = useRef();

  async function getUsers() {
    const usersFromApi = await Api.get('/users');
    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await Api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    formRef.current.reset();
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function deleteUsers(id) {
    await Api.delete(`/users/${id}`);
    getUsers();
  }

  return (
    <div className='container'>
      <form ref={formRef}>
        <h1>User Registration</h1>
        <input
          placeholder='Enter your name...'
          name='name'
          type='text'
          autoComplete='off'
          ref={inputName}
        />
        <input
          placeholder='Enter your age...'
          name='age'
          type='number'
          autoComplete='off'
          ref={inputAge}
        />
        <input
          placeholder='Enter your e-mail...'
          name='email'
          type='email'
          autoComplete='off'
          ref={inputEmail}
        />

        <button type='button' onClick={createUsers}>
          Register
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>
              Name: <span>{user.name}</span>
            </p>
            <p className='mid-p'>
              Age: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>
          <div className='div-buttons'>
          <button>
            <img src={Edit} alt='Edit User' />
          </button>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt='Delete user' />
          </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;

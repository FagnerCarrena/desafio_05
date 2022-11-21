import './styles.css';
import image from '../../assets/Logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { getItem, setItem } from '../../utils/storage';
import OpenEye from '../../assets/open-eye.svg';
import CloseEye from '../../assets/close-eye.svg';


function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);



  useEffect(() => {
    const token = getItem('token');


    if (token) {
      navigate('/Home')
    }

  }, []);


  async function handleSubmit(e) {
    e.preventDefault();

    setError('');
    setSuccess('');

    try {

      if (!email || !password) {
        setError('o email e senha sao obrigatorios!')
        return;
      }

      if (password.length < 3) {
        setError(" a senha precisa ter no minimo 3 digitos!")
        return;
      }
      const response = await api.post('/login', {
        email,
        senha: password
      });



      navigate('/home');

      const { usuario, token } = response.data

      setItem('token', token);
      setItem('userId', usuario.id);
      setItem('nome_loja:', usuario.nome_loja);


    } catch (error) {
      setError(error.response.data.mensagem)
    }
  }


  return (




    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className='market' alt='logo'>
          <img src={image} alt='logo' />
        </div>

        <h2>Boas-vindas</h2>
        <span>Use seu e-mail e senha para acessar a conta</span>

        <label className='container-inputs'>E-mail</label>
        <input
          type='text'
          nome='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='digite seu Email' />


        <label className='container-inputs'>Senha</label>
        <div className='container-eye'>
          <input
            type={showPassword ? "text" : "password"}
            nome='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='digite sua Senha' />
          <img
            className='eye-icon' src={showPassword ? OpenEye : CloseEye}
            onClick={() => setShowPassword(!showPassword)}
            alt='show' />
        </div>
        {error && <span className='error'>{error}</span>}
        {success && <span className='success'>{success}</span>}

        <button
          onClick={(e) => handleSubmit(e)}
        >Fazer Login
        </button>

        <Link to='/Signup'><p className='paragrafo'> Não possui uma conta?  <span className='pink'>Cadastrar</span></p> </Link>

      </form>

    </div>

  );
}

export default SignIn;

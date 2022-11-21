import './styles.css';
import image from '../../assets/Logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useState } from 'react';


const defaultForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}



function SignUp() {

  const navigate = useNavigate();

  const [form, setForm] = useState({ ...defaultForm })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')



  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {

      if (!form.name || !form.email || !form.password || !form.confirmPassword) {
        setError(' Campos de preechimento obrigatórios')
        return;
      }
      if (form.password.length < 3) {
        setError(" a senha precisa ter no minimo 3 digitos!")

        return;
      }
      if (form.password !== form.confirmPassword) {
        setError("verifique sua senha!")
        return;
      }
      const response = await api.post('/usuarios',
        {

          nome_loja: form.name,
          email: form.email,
          senha: form.password

        });
      console.log(response);
      setSuccess("Cadastro efetuado com sucesso!");

      setTimeout(function () {
        navigate('/SignIn');

      }, 2000);





    } catch (error) {
      setError(error.response.data.mensagem)
    }
  }




  function handleChangeForm({ target }) {
    setForm({ ...form, [target.name]: target.value })

  }




  return (
    <div className='container'>


      <form onSubmit={handleSubmit} className='one'>
        <div className='market' alt='logo'>
          <img src={image} alt='logo' />
        </div>

        <h2>Cadastre-se</h2>
        <label className='container-inputss container-input'>Nome da loja</label>
        <input
          name='name'
          value={form.name}
          onChange={handleChangeForm}
          type='text' />
        <label className='container-inputs'>E-mail</label>
        <input
          name='email'
          value={form.email}
          onChange={handleChangeForm}
          type='text' />


        <label className='container-inputs'>Senha</label>
        <input
          name='password'
          value={form.password}
          onChange={handleChangeForm}
          type='text'
        />
        <label className='container-input'>Confirme sua Senha</label>
        <input
          name='confirmPassword'
          value={form.confirmPassword}
          onChange={handleChangeForm}
          type='password'
        />
        {error && <span className='error'>{error}</span>}
        {success && <span className='success'>{success}</span>}
        <p>Ao criar uma conta, você concorda com a nossa<br></br>
          <span className='pink'>Política de Privacidade</span>  e <span className='pink'>Termos de serviço</span></p>

        <button>Criar conta</button>

        <Link to='/SignIn'><p className='paragrafo'> ja tem uma conta?  <span className='pink'>Fazer login</span></p> </Link>


      </form>

    </div>
  );
}

export default SignUp;

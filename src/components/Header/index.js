import './styles.css';
import Cubus from '../../assets/logocubus.svg';
import Carrinho from '../../assets/carrinhos.svg';
import Anuncios from '../../assets/anuncio.svg';
import Usuario from '../../assets/usuario.svg';
import { Link } from 'react-router-dom';
import { getItem } from '../../utils/storage';
import Loja from '../../assets/loja.svg';
import Back from '../../assets/voltar.svg'


function header() {
    const token = getItem('token');
    console.log(token)

    return (
        <header>
            {token ?
                <div className='big'>
                    <img src={Back} alt='logo' />
                    <img src={Cubus} alt='logodaempresa' />
                    <img src={Loja} alt='logo' />
                </div>
                :
                < div className='logo' >
                    <Link to='/SignIn'><img src={Cubus} alt='logo' /></Link>
                    <Link to='/SignIn'><img src={Carrinho} alt='logo' /></Link>
                    <Link to='/SignIn'><img src={Anuncios} alt='logo' /></Link>
                    <Link to='/SignIn'><img src={Usuario} alt='logo' /></Link>
                    <Link className='dolar' to='/SignIn' > $ Quero vender</Link>

                </div >
            }
        </header>
    )
}

export default header;




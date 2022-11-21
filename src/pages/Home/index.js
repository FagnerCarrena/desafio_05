import './styles.css';
import Header from '../../components/Header';
import Card from '../../components/Card'
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { getItem } from '../../utils/storage';




function Home() {
    const [product, setProduct] = useState([]);

    const token = getItem('token');


    async function loadProduct() {
        try {
            const response = await api.get('/produtos', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProduct([...response.data])

        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        loadProduct();
    }, [])





    return (
        <div >
            <Header />

            <div className='user-Card'>



                {product.map((produto) => (

                    <Card
                        produto={produto}
                    />


                ))}


            </div>

        </div>






    )


}



export default Home;
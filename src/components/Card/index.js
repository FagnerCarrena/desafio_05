import './styles.css';





function Card({ produto }) {

    return (


        <div className='card' key={produto.id}>

            <img src={produto.imagem} alt="imagem" />


            <p>{produto.descricao}</p>
            <span>{produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            }</span>
        </div>








    )


}

export default Card;



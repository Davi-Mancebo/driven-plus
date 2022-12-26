import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, MaskInput, Plano } from "../assets/css/style";
import seta from '../assets/img/Seta.svg'
import lista from  '../assets/img/lista.svg'
import dinheiro from '../assets/img/dinheiro.svg'
import { AuthContext } from "../provider/provider";

export default function AssinarPlano(){
    const [plano, setPlano] = useState({})
    const [beneficio, setBeneficio] = useState([])
    const [value, setValue] = useState(false)
    const [nome, setNome] = useState('');
    const [cartao, setCartao] = useState('');
    const [cvv, setCvv] = useState('');
    const [validade, setValidade] = useState('');

    const user = localStorage.getItem('usuario');
    const userObject = JSON.parse(user)

    const id = localStorage.getItem('plano')
    const navigate = new useNavigate();

    const config = 
    {
        headers: {
            Authorization: 'Bearer ' + userObject.token
        }
    }

    useEffect(() =>{
        axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${id}`, config)
        .then((crr) => {
            console.log(crr.data)
            setPlano(crr.data)
            setBeneficio(crr.data.perks)
        })
        .catch(err => console.log(err.response.data))
    }, [])

    function assinar(){
        const dados = 
        {
            membershipId: id,
            cardName: nome,
            cardNumber: cartao,
            securityNumber: parseInt(cvv),
            expirationDate: validade
        }
        console.log(dados)
        axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions', dados, config)
        .then(() => {
            axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/login', {
                email: userObject.email,
                password: userObject.password
            }).then(crr =>{
                const data = localStorage.setItem('usuario', JSON.stringify(crr.data))
            })
            alert('Plano Assinado com sucesso!')
            navigate('/home')
        })
        .catch((err) => {
            console.log(err.response.data)
            alert('Alguma coisa deu errado, verifique os dados e tente novamente!');
            setValue(false)            
        })
    }

    return(
        <>
            {value &&           
                <Plano>
                    <div className="dados">
                        <h1>{`Tem certeza que deseja assinar o plano ${plano.name} (R$ ${plano.price})?`}</h1>
                        <div>
                            <button onClick={() => setValue(false)}>Não</button>
                            <button className="btn1" onClick={assinar}>Sim</button>
                        </div>
                    </div>
                </Plano>
            }

            <Container>
                <div className="seta" onClick={() =>  navigate('/subscriptions')}>
                    <img src={seta}/>
                </div>

                <div className="plano">
                    <img src={plano.image}/>
                    <h1>{plano.name}</h1>
                </div>

                <div className="beneficios">
                    <h2><img src={lista}/>Beneficios:</h2>
                    {beneficio.map((p) => <Beneficios id={p.id} beneficio={p.title}/>)}
                </div>
                <div className="beneficios">
                    <h2><img src={dinheiro}/>Preço</h2>
                    <h3>R$ {plano.price} cobrados mensalmente</h3>
                </div>

                <div className="inputs">
                    <input 
                        placeholder="Nome impresso no cartão"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <MaskInput
                        placeholder="Digitos do cartão"
                        mask='0000 0000 0000 0000'
                        value={cartao}
                        onChange={e => {
                            setCartao(e.target.value)
                        }}
                    />
                    <div>
                        <input
                            placeholder="Código de segurança"
                            maxLength={4}
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                        />
                        <MaskInput
                            placeholder="Validade"
                            mask={'00/00'}
                            value={validade}
                            onChange={(e) => setValidade(e.target.value)}
                        />
                    </div>
                </div>

                <button onClick={() => setValue(true)}>ASSINAR</button>
            </Container>
        </>
    )
}

function Beneficios(props){
    return(
        <h3>{props.id}. {props.beneficio}</h3>
    )
}
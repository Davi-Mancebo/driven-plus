import axios from "axios";
import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../assets/css/style";

export default function Assinatura(){
    const navigate = new useNavigate()
    const [planos, setPlanos] = useState([])
    const token = localStorage.getItem('usuario')

    const config = {
        
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    useEffect(()=> {
        axios.get('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships', config)
        .then((crr) =>{
            setPlanos(crr.data)
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [])

    return(
        <Container>
            <h1>Escolha seu Plano</h1>
            {planos.map(p => <Planos img={p.image} price={p.price} id={p.id}/>)}
        </Container>
    )
}

function Planos(props){
    const navigate = new useNavigate()
    return(
        <div className="planos" onClick={() => {
            navigate(`/subscriptions/${props.id}`)
            localStorage.setItem('plano', props.id)
            }}>
            <img src={props.img}/>
            <p>R$ {props.price}</p>
        </div>
    )
}
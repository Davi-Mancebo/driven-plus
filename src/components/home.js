import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { HomeContainer, HomeFooter, Plano, User } from "../assets/css/style";
import { AuthContext } from "../provider/provider";
import {FaUserCircle} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

export default function Home(){
    const [perks, setPerks] = useState([])
    const localUser = localStorage.getItem('usuario')
    const navigate = new useNavigate();
    const [value, setValue] = useState(false)

    const localUserObject = JSON.parse(localUser)

    const config = {
        
        headers: {
            Authorization: 'Bearer ' + localUserObject.token
        }
    }

    console.log(localUserObject)

    if(localUserObject.membership === null){
        axios.get('https://mock-api.driven.com.br/api/v4/driven-plus/auth/login', 
        {
            email: localUserObject.email,
            password: localUserObject.password
        }).then(crr =>{
            console.log(crr.data)
            localStorage.setItem('usuario', crr.data)
        })
    }


    if(perks.length === 0){
        setPerks(localUserObject.membership.perks)
        console.log(perks)
    }
   
    function cancelar(){
        axios.delete('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions', config)
        .then(navigate('/subscriptions'))
    }
    function sair(){
        localStorage.clear()
        navigate('/')   
    }

    return(
        <>
        {value &&
                <Plano>
                <div className="dados">
                    <h1>Deseja Sair de sua conta?</h1>
                    <div>
                        <button onClick={() => setValue(false)}>Não</button>
                        <button className="btn1" onClick={sair}>Sim</button>
                    </div>
                </div>
            </Plano>
        }
        <HomeContainer>
            <div className="logo">
                <img src={localUserObject.membership.image}/>
            </div>
            
            <User onClick={() => setValue(true)}/>
            <h1>Olá, {localUserObject.name}</h1>

            {perks.map((p) => <Perks link={p.link} name={p.title}/>)}

            <HomeFooter>
                <div className="btn1">
                    <button onClick={() => navigate('/subscriptions')}>Mudar plano</button>
                </div>
                <div className="btn2">
                    <button onClick={cancelar}>Cancelar plano</button>
                </div>
            </HomeFooter>
        </HomeContainer>
        </>
    )
}

function  Perks(props){
    return(
        <a href={props.link}>{props.name}</a>
    )
}
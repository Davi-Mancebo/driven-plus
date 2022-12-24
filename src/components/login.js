import axios from "axios"
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GeralLogin, StyleLink } from "../assets/css/style"
import logo from "../assets/img/logo.png"
import { AuthContext } from "../provider/provider"

export default function Login(){
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [text, setText] = useState('')
    const [value, setValue] = useState(false)
    const navigate = new useNavigate();

    const data = {
        email: email,
        password: senha
    }

    const serialData = JSON.stringify(data)
    
    function login(){


        const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", data)
        promise.then((e) => {
            localStorage.setItem("usuario", e.data.token)
            console.log(e.data)
            if(e.data.membership === null){
                navigate("/subscriptions")
            }
            else{
                navigate('/home')
            }
        })
        promise.catch((err)=> {
            console.log(err.response)
            if(err.response.status === 401){
                setValue(true)
                setText("Usuário e/ou senha inválidos!");
                setInterval(() => setValue(false), 7000)
            }
            else{
                alert(`erro ${err.response.status} tente novamente!`)
            }
        })
    }

    return(
        <GeralLogin>
            <img src={logo}/>

            {value &&
                <h1>{text}</h1>
            }
            <input
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input 
                type='password'
                placeholder="senha"
                value={senha}
                onChange={s => setSenha(s.target.value)}
            />
            <button onClick={login}>ENTRAR</button>
            <StyleLink to={'/sign-up'}>Não possuí uma conta? Cadastre-se</StyleLink>
        </GeralLogin>
    )
}
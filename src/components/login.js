import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
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
    
    const usuarioLogado = localStorage.getItem('logado')

    const user = localStorage.getItem('usuario')
    const userObject = JSON.parse(user)

    useEffect(() =>{
        if(usuarioLogado){
            const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", 
            {
                email: userObject.email,
                password: userObject.password
            })
            .then( crr =>{
                console.log(crr.data)
                const dadosSerial = JSON.stringify(crr.data)
                localStorage.setItem('usuario', dadosSerial)

                console.log(JSON.parse(localStorage.getItem('usuario')))

                if(crr.data.membership !== null){
                    navigate('/home')
                }
                else{
                    navigate('/subscriptions')
                }
            }   
            )
        }
    }, [])


    const data = {
        email: email,
        password: senha
    }
    
    function login(){
        const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", data)
        promise.then((e) => {
            const serialData = JSON.stringify(e.data)

            localStorage.setItem("usuario", serialData)
            localStorage.setItem('logado', true)
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
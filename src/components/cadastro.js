import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GeralLogin, MaskInput, StyleLink } from "../assets/css/style";

export default function Cadastro(){
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState('');
    const [email, setEmail]  = useState('');
    const [password, setPassword] = useState("");
    const [value, setValue] = useState(false)

    const url = 'https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up';

    const navigate = new useNavigate();

    function cadastro(){
        const data = 
        {
            email: email.trim(),
            name: name.trim(),
            cpf: cpf.trim(),
            password: password.trim()
        };

        const promise = axios.post(url, data);
        promise.then(() => {
            alert('Você foi cadastrado, agora faça login!');
            navigate('/');
        });
        promise.catch((err) => {
            console.log(err.response)
            if(err.response.status === 409){
                alert("usuario já cadastrado!")
                navigate('/')
            }
            if(err.response.status === 422){
                setValue(true)
                setTimeout(() => setValue(false), 7000)
            }else{
                alert('alguma coisa deu errado, tente novamente!')
            }
        })
    };    

    return(
        <GeralLogin>
            <input
                placeholder="Nome"
                value={name}
                onChange={(n) => setName(n.target.value)}
            />
            <MaskInput
                mask="000.000.000-00"
                placeholder="Digite o seu CPF"
                value={cpf}
                onChange={c => {
                    setCpf(c.target.value)
                }}
                maxLength="14"
            />


            {value &&
                <h1>email invalido!</h1>
            }
            <input
                placeholder="E-mail"
                value={email}
                onChange={e => {
                    setEmail(e.target.value)
                }}
            />
            <input
                placeholder="Senha"
                type='password'
                value={password}
                onChange={p => setPassword(p.target.value)}
            />
            <button onClick={cadastro}>CADASTRAR</button>
            <StyleLink to={'/'}>Já possuí uma conta? Entre</StyleLink>
        </GeralLogin>
    );
};

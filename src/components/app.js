import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./cadastro";
import Login from "./login";
import Assinatura from "./assinar";
import AssinarPlano from "./assinarPlano";

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/sign-up" element={<Cadastro />}/>
                <Route path="/subscriptions" element={<Assinatura/>}/>
                <Route path="/subscriptions/:idplano" element={<AssinarPlano />}/>
                <Route path="/home"/>
            </Routes>
        </BrowserRouter>
    )
}

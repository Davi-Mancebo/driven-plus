import styled from "styled-components";
import { Link } from "react-router-dom";
import { IMaskInput } from "react-imask";

export const Container = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: #0E0E13;
    height: 100%;

    box-sizing: border-box;

    padding: 30px 40px;

    font-family: 'Roboto', sans-serif;
    img{
        margin-bottom: 10px;
    }
    h1{
        margin-top: 14px;
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 24px;
        color: #ffffff;
    }
    button{
        width: 100%;
        height: 40px;

        background-color: #FF4791;

        border: 0px;
        border-radius: 8px;

        margin-top: 8px;

        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        color: #FFFFFF;
    }
    .seta{
        position: fixed;
        top: 20px;
        left: 20px;
    }
    .beneficios{
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: flex-start;

        margin-bottom: 12px;

        h2{
            font-size: 16px;
            color: #ffffff;
            margin-bottom: 7px;
        }
        h3{
            font-size: 14px;
            color: #ffffff;
            margin-bottom: 3px;
        }
    }
    .inputs{
        input{
            width: 90%;
            padding: 18px 14px;

            border-radius: 8px;

            border: 0px;

            font-size: 14px;
            color: #666666;

            margin-bottom: 10px;
            margin-right: 5px;
        }
        div{
            display: flex;
        }
    }

    .plano{
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        margin-top: 40px;

        h1{
            font-size: 32px;
            color: #ffffff;
        }
    }
    .planos{
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 180px;

        border: 3px solid #7e7e7e;
        border-radius: 12px;

        margin-bottom: 10px;
        
        p{
            font-size: 24px;
            color: #ffffff;
            margin-left: 10px;
        }
    }

`
export const Plano = styled.div`
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 1;

    position: fixed;

    width: 100%;
    height: 100%;

    background-color: rgba(0,0,0,0.7);

    .dados{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        padding: 10px 22px;

        width: 65%;
        height: 210px;

        border-radius: 12px;

        background-color: #ffffff;

        font-family: 'Roboto', sans-serif;

        h1{
            font-size: 20px;
            font-weight: 700;
            text-align: center;

            width: 220px;
            margin-top: 22px;
        }

        div{
            display: flex;
            width: 100%;

            button{
                width: 100%;
                height: 40px;

                background-color: #cecece;
                color: #ffffff;

                margin-right: 5px;

                border: 0px;
                border-radius: 5px;
            }
            .btn1{
                width: 100%;
                height: 40px;
                
                background-color: #FF4791;

                color: #ffffff;
            }
        }

    }
`

export const GeralLogin = styled.div`
    padding: 100px 38px;

    height: 100%;


    background-color: #0E0E13;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    font-family: 'Roboto', sans-serif;

    img{
        margin-bottom: 100px;
    }
    input{
        width: 100%;
        padding: 18px 14px;

        border-radius: 8px;

        font-size: 14px;
        color: #666666;

        margin-bottom: 16px;
    }
    input::placeholder{
        color: #7E7E7E;
        font-size: 14px;
    }

    button{
        width: 100%;
        height: 40px;

        background-color: #FF4791;

        border: 0px;
        border-radius: 8px;

        margin-top: 8px;

        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        color: #FFFFFF;
    }

    p{
        color: #FFFFFF;
        font-size: 14px;
        margin-top: 24px;
    }
    h1{
        margin-bottom: 5px;

        color: red;
    }
`
export const MaskInput = styled(IMaskInput)`
    width: 100%;
    padding: 18px 14px;

    border-radius: 8px;

    font-size: 14px;
    color: #666666;

    margin-bottom: 16px;
`

export const StyleLink = styled(Link)`
    margin-top: 24px;

    color:  #ffffff;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
`;

import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';

const CreatePoint = () => {
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to="/">
                    <FiArrowLeft />
                  Voltar para a home  
                </Link>
            </header>

            <form>
                <h1>
                    Cadastro do <br/> ponto de coleta
                </h1>
            </form>
        </div>
    )
}

export default CreatePoint;
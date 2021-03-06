import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';
import './styles.css';
import axios from 'axios';

interface Item{
    id: number,
    title: string,
    img_url: string
}


interface IBGEUFResponse{
    sigla:string
}

interface IBGECityResponse{
    nome:string
}

const CreatePoint = () => {
    const [ items, setItems ] = useState<Item[]>([]);
    const [ ufs, setUfs ] = useState<string[]>([]);
    const [ selectedUf, setSelectedUf ] = useState('0');
    const [ cities, setCities ] = useState<string[]>([]);
    const [ selectedCity, setSelectedCity ] = useState('0');

useEffect(()=>{
    api.get('items').then(response=>{
        setItems(response.data);
    })
},[]);

useEffect(()=>{
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(
        response=>{
            const ufInitials = response.data.map(uf=>uf.sigla);
            setUfs(ufInitials);
        }
    )
},[]);

useEffect(()=>{
    if(selectedUf === '0'){
        return;
    }
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response=>{
            const cityNames = response.data.map(city=>city.nome);
            setCities(cityNames);
        }
    )
    
},[selectedUf]);

function handleSelectUf(event: ChangeEvent<HTMLSelectElement>){
   const uf =  event.target.value;

   setSelectedUf(uf);
   console.log(uf);
}

function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){
   const city =  event.target.value;

   setSelectedCity(city);
   console.log(city);
}

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
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                <div className="field">
                    <label htmlFor="name">Nome da entidade</label>        
                    <input 
                        type="text"
                        name="name"
                        id="name"
                    />
                </div> 
                <div className="field-group">
                    <div className="field">
                        <label htmlFor="name">E-mail</label>        
                        <input 
                            type="email"
                            name="email"
                            id="email"
                        />
                    </div> 
                    <div className="field">
                    <label htmlFor="name">Whatsapp</label>        
                    <input 
                        type="text"
                        name="whatsapp"
                        id="whatsapp "
                    />
                    </div> 

                </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                    <Map center={[-29.9439688,-51.0979186]} zoom={15}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[-29.9439688,-51.0979186]}/>
                    </Map>
                    <div className="field-group">
                        <div className="field">
                             <label htmlFor="uf">Estado ( UF )</label>
                            <select 
                                name="uf" 
                                id="uf"
                                value={selectedUf}
                                onChange={handleSelectUf}>
                            <option value="0">Selecione uma UF</option> 
                            {ufs.map(uf=>(
                                <option key={uf} value={uf}>{uf}</option>
                            ))}   
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select 
                                    name="city" 
                                    id="city"
                                    value={selectedCity}
                                    onChange={handleSelectCity}
                                     >
                            <option value="0">Selecione uma cidade</option> 
                            {cities.map(city=>(
                                <option key={city} value={city}>{city}</option>
                            ))}   
                            </select>
                        </div>
                    </div>

                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo </span>
                    </legend>
                <ul className="items-grid">
                    {items.map(item =>( 
                        <li key={item.id} >
                            <img src={item.img_url} alt={item.title}/>
                        <span>{item.title}</span>
                    </li>
                    ))}
                    
                </ul>
                </fieldset>
                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    )
}

export default CreatePoint;
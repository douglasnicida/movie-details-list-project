import React from "react";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

import api from '../../services/api.js';

import './home.css';

function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "d3ce8fd12a8a21b7431a94231c9990f8",
                    language: "pt-BR",
                    page: 1
                }
            });

            setFilmes(response.data.results.slice(0,10)); //pega os 10 primeiros resultados da api

        }

        loadFilmes();

        setLoading(false);

    }, []);

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div className="home-container">
            <div className="lista-filmes">

                {filmes.map((filme)=>{
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            
                            <div className="filme-container">

                                <div className="left">
                                    <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}></img>
                                </div>

                                <div className="right">
                                    <div>
                                        <h2>Overview</h2>
                                        <p>{filme.overview}</p>
                                    </div>

                                    <Link to={`/filme/${filme.id}`}>Acessar</Link>
                                </div>
                            </div>
                            
                            <hr/>
                        </article>
                    )
                })}
                
            </div>
        </div>
    );
}

export default Home;
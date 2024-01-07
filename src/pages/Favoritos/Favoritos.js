import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";

import './favoritos.css';

function Favoritos(){

    const [listaFavoritos, setFavoritos] = useState([]);

    useEffect(() =>{

        const minhaLista = localStorage.getItem("@myfilmlist");
        setFavoritos(JSON.parse(minhaLista) || []);

    }, []);

    function excluirFilme(id){
        let filtroFilmes = listaFavoritos.filter((item) => {
            return(item.id !== id);
        });

        setFavoritos(filtroFilmes);

        localStorage.setItem("@myfilmlist", JSON.stringify(filtroFilmes));

        toast.success("Filme removido com sucesso!");
    }

    return(
        <div className="meus-filmes">
            <h1>Meus Filmes</h1>

            {(listaFavoritos.length === 0) ? 
            
            <div className="noneContainer">
                <span className="none">Você não possui nenhum filme salvo :(</span> 
            </div>
            
            
            
            
            :

            <ul>
                {listaFavoritos.map((filme)=>{
                    return(
                        <li key={filme.id}>
                            
                            <div className="filme">
                                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                                <div className="details">
                                    <span>{filme.title}</span>
                                    <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                </div>
                            </div>

                            <div className="actions">
                                
                                <button className="btExcluir" onClick={() => excluirFilme(filme.id)}>Excluir</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        }
        </div>
    
    );
}

export default Favoritos;
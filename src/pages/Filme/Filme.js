import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api";

import "./filme.css";

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "d3ce8fd12a8a21b7431a94231c9990f8",
                    language: "pt-BR"
                }
            })
            .then((response)=>{
                setFilme(response.data); //passando os dados que o axios pegou no .data
                setLoading(false);
            })
            .catch(()=> {
                navigate('/', { replace: true });
                return;
            })
        }

        loadFilme();

        return () => { //unmount (quando sai da pagina em que foi montado pelo useEffect)

        }
    }, [navigate, id]); //passando as dependencias externas utilizadas dentro do useEffect

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@myfilmlist");
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => 
            filmeSalvo.id === filme.id
        ); //vendo se existe o filme ja salvo

        if(hasFilme){
            toast.warn("Esse filme já se encontra na lista!");
            return;
        }
        filmesSalvos.push(filme);
        localStorage.setItem("@myfilmlist", JSON.stringify(filmesSalvos));
        toast.success("Filme adicionado aos favoritos!")
    }

    if(loading){
        return(
             <div className="filme-info">
                <h1>Carregando detalhes...</h1>
             </div>
            
        )
    }



    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span className="overview">{filme.overview}</span>

            <strong className="avaliacao">Avaliação: <span className={`avaliacao ${
                (filme.vote_average < 5) ? "ruim" : (filme.vote_average < 7.5) ? "medio" : "bom"
            }`}>{filme.vote_average}</span> / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Favoritar</button>

                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a> 
                </button>
            </div>

        </div>
    )

    //o target blank serve para abrir em uma nova guia o link que está na âncora
    //o rel é opcional só pra dizer se o link passado tem relação externa ou interna com o site
}

export default Filme;
import React, { useEffect, useState } from "react";
import "./Home.css";
import Tmdb from "../../Tmdb"
import MovieRow from "../../Components/MovieRow";
import FeaturedMovie from "../../Components/FeaturedMovie";
import Header from "../../Components/Header";

export default () => {

  const [userData, setUserData] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {

    const checkConnection = async () => {

      if (!(sessionStorage.getItem('account'))) {
        window.location.href = "/";
        alert("Entre na sua conta ou crie uma nova!")
        sessionStorage.clear();
        setUserData(null);
      }

      let id = sessionStorage.getItem('account');

      fetch(`http://localhost:3001/userData/${id}`, {
        method: 'get',
        Accept: 'application/json',
        ContentType: 'application/json',
        mode: 'cors'
      })
        .then(res => {
          if (!res.ok) throw new Error(res.status)
          return res.json()
        })
        .then(data => setUserData(data))

    }

    checkConnection();

    const loadAll = async () => {
      // Pegando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Featured
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };

  }, [])

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> Lucas Weirich <br />
        Direitos de imagem para Netflix <br />
        Dados pegos no site Themoviedb.org
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://www.metageek.com/img/buffering-800px.gif" alt="Carregando..." />
        </div>
      }
    </div>
  );
};
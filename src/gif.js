import React, { useState, useEffect } from 'react';
import './style.css';
import Errorcat from './img/error.gif';
import waiting from './img/loading.gif';
const initialpage = 0;


function Gif() {
  const [Giff, setGiff] = useState([])
  const [loading, setloading] = useState(false)
  const [Error, setError] = useState(false)
  const [limit, setlimit] = useState(20)
  const [search, setsearch] = useState("Barney+Stinson")
  const [Page, setPage] = useState(initialpage)
  const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=eSuJruLdh1NuoFKB4UUXsicSQmvLrmHD&q=${search}&limit=${limit}&offset=${Page*limit}&rating=g&lang=en`


  function handleSubmit(e) {
    e.preventDefault();
    setsearch(e.target.search.value)
    setPage(0)
  }
  function handlenumber(ev) {
    ev.preventDefault();
    setlimit(ev.target.number.value)
  }
  function buttonClick(event) {
    const value = event.target.innerText;
    if(value==="Next")setPage(Page+1)
    if(value==="Previus")setPage(Page-1)
}

  useEffect(function () {
    setloading(true)
    fetch(apiURL)
      .then(res => res.json())
      .then(response => {
        const { data } = response
        const gifs = data.map(image => {
          const { images, title } = image
          const { url } = images.downsized_medium
          return { title, url }
        })
        return gifs
      })
      .catch(err => {
        setError = (true)
        setloading(false)
      })
      .then(gifs => {
        setGiff(gifs)
        setloading(false)
        setError = (false)
      })
  }, [search, limit, Page])


  if (Error === 'true' || Giff === false) {
    return (
      <div className="web">
        <section className='title'><h1> Buscador de Gifs</h1>
        </section>
        <section className="top">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Cerca" name='search' autoComplete='off'></input>
            <button type='submit'>Buscar</button>
          </form>
        </section>
        <section className="videos">
          <div className='Error'>
            <img src={Errorcat}></img>
          </div>
        </section>
        <section className="bot">
        </section>
      </div>);
  } else if (loading === true) {
    return (
      <div className="web">
        <section className='title'><h1> Buscador de Gifs</h1></section>
        <section className="top">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Cerca" name='search' autoComplete='off'></input>
            <button type='submit'>Buscar</button>
          </form>
        </section>
        <section className="videos">
          <div className='loading'>
            <img src={waiting}></img>
          </div>
        </section>
        <section className="bot">
        </section>
      </div>
    );

  } else {
    if (Page===0) {
      return (
        <div className="web">
          <section className='title'><h1> Buscador de Gifs</h1></section>
          <section className="top">
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Cerca" name='search' autoComplete='off'></input>
              <button type='submit'>Buscar</button>
            </form>
          </section>
          <section className='space'></section>
          <section className="videos">
            {Giff.map(singleGif =>
              <div className='Square'>
                <h4>{singleGif.title}</h4>
                <img src={singleGif.url} />
              </div>)}
          </section>
          <section className="bot">
            <form onSubmit={handlenumber}>
              <input type="number" placeholder={limit} name='number' autoComplete='off'></input>
              <button className='botbutton' type='submit'>Por Página</button>
            </form>
          </section>
          <section className='Pag'>
            <button onClick={buttonClick}>Next</button>
          </section>
        </div>
      );
    }else{
      return (
        <div className="web">
          <section className='title'><h1> Buscador de Gifs</h1></section>
          <section className="top">
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Cerca" name='search' autoComplete='off'></input>
              <button type='submit'>Buscar</button>
            </form>
          </section>
          <section className='space'></section>
          <section className="videos">
            {Giff.map(singleGif =>
              <div className='Square'>
                <h4>{singleGif.title}</h4>
                <img src={singleGif.url} />
              </div>)}
          </section>
          <section className="bot">
            <form onSubmit={handlenumber}>
              <input type="number" placeholder={limit} name='number' autoComplete='off'></input>
              <button className='botbutton' type='submit'>Por Página</button>
            </form>
          </section>
          <section className='Pag'>
            <button onClick={buttonClick}>Previus</button> <button onClick={buttonClick}>Next</button>
          </section>
        </div>
      );
    } 
  }
}
export default Gif;


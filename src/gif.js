import React, { useState, useEffect } from 'react';
import './style.css';
import Errorcat from './img/error.gif';
import waiting from './img/loading.gif';
import { ButtonGroup, Button, TextField} from '@mui/material';
const initialpage = 0;

function Gif() {
  const [Giff, setGiff] = useState([])
  const [loading, setloading] = useState(false)
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
    if(value.toLowerCase()==="next")setPage(Page+1)
    if(value.toLowerCase()==="previous")setPage(Page-1)
}



  useEffect(function () {
    setloading(true)
    fetch(apiURL)
      .then(res => res.json())
      .then(response => {
        const { data } = response
        const gifs = data.map(image => {
          const { images, title } = image
          const { url } = images.fixed_height_downsampled
          return { title, url }
        })
        return gifs
      })
      
      .then(gifs => {
        setGiff(gifs)
        setloading(false)
        
      })
  }, [search, limit, Page])


  if (Giff === false) {
    return (
      <div className="web">
        <section className='title'>´
        <h1>GIFS SEEKER</h1>
        </section>
        <section className="top">
          <form onSubmit={handleSubmit}>
          <TextField size="small" type="text" placeholder="Search" name='search' autoComplete='off'></TextField>
            <Button type='submit' variant="contained"></Button>
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
        <section className='title'>
          <h1>GIFS SEEKER</h1></section>
        <section className="top">
          <form onSubmit={handleSubmit}>
          <TextField size="small" type="text" placeholder="Search" name='search' autoComplete='off'></TextField>
            <Button type='submit' variant="contained">Buscar</Button>
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
          <section className='title'>
            <h1>GIFS SEEKER</h1>
          </section>
          <section className='line'></section>
          <section className="top">
            <form onSubmit={handleSubmit}>
            <TextField size="small" type="text" placeholder="Search" name='search' autoComplete='off'></TextField>
              <Button type='submit' variant="contained" >Search</Button>
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
          <section className='line'></section>
          <section className="bot">
            <form onSubmit={handlenumber}>
              <TextField size="small" type="number" placeholder={limit} name='number' autoComplete='off'></TextField>
              <Button variant="contained" className='botbutton' type='submit'>For Page</Button>
            </form>
          </section>
          <section className='Pag'>
            <Button onClick={buttonClick} variant="contained" >Next</Button>
          </section>
        </div>
      );
    }else{
      return (
        <div className="web">
          <section className='title'>
            <h1>GIFS SEEKER</h1></section>
          <section className="top">
            <form onSubmit={handleSubmit}>
              <TextField size="small" type="text" placeholder="Search" name='search' autoComplete='off'></TextField>
              <Button type='submit' variant="contained">Buscar</Button>
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
            <TextField size="small" type="number" placeholder={limit} name='number' autoComplete='off'></TextField>
              <Button variant="contained" className='botbutton' type='submit'>For Page</Button>
            </form>
          </section>
          <section className='Pag'>
            <ButtonGroup variant="contained" color="primary">
            <Button onClick={buttonClick}>Previous</Button> 
            <Button variant="contained" onClick={buttonClick}>Next</Button>
            </ButtonGroup>
          </section>
        </div>
      );
    } 
  }
}
export default Gif;


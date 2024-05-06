import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';

function App() {
  //films stores data from a call
  //setfilms is function to track changes to the state of films
  const [films, setFilms] = useState();
  const [film, setFilm] = useState();
  const [reviews, setReviews] = useState();

  //Pass path info, appended to base url info
  //Allows for long running processes to occur without being blocked
  //Promise to return to code once task completed
  const getFilms = async() =>{
    try{
      const response = await api.get("/api/v1/films");
      console.log(response);

      setFilms(response.data);
    
    } catch(err){
      console.log(err);
    }
  }

  const getFilmData = async(filmId) =>{
    try{
      const response = await api.get(`/api/v1/films/${filmId}`);

      const singleFilm = response.data;
      setFilm(singleFilm);
      setReviews(singleFilm.reviews);
      
    } catch(err){
      console.log(err);
    }
  }
  //so that getfilms is activated on load
  useEffect(() =>{
   getFilms();
  },[])

  return (
    <div className="App">
    <Header/>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home films = {films} />}> </Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
          <Route path="/Reviews/:filmId" element={<Reviews getFilmData = {getFilmData} film={film} reviews = {reviews} setReviews = {setReviews}/>}> </Route>
        </Route>
    </Routes>

    </div>
  );
}

export default App;

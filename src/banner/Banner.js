import React, { useState, useEffect } from 'react';
import './Banner.css';
import axios from '../network/axios';
import requests from '../network/Request';

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      console.log(movie);
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > 0 ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url("${process.env.REACT_APP_BASE_IMAGE_URL}${movie?.backdrop_path}")`,
        backgroundPosition: 'center center',
      }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className='banner__buttons'>
          <button className='banner__button'>Play</button>
          <button className='banner__button'>My List</button>
        </div>
        <h1 className='banner__description'>
          {truncate(`${movie?.overview}`, 149)}
        </h1>
      </div>

      <div className='banner--fadeBottom' />
    </header>
  );
}

export default Banner;

import React, { useEffect, useState } from "react";
import Actors from "./Actors";
import Content from "./Content";

const Header = () => {
  const [inputVal, setInputVal] = useState({ name: "all" });
  const [MoviesData, setMoviesData] = useState(null);
  const [actor, setActorfilter] = useState(false);


  let dataUrl = "";
  const inputHandler = (e) => {
    setInputVal({ name: e.target.value });
  }


  // if (actor) {
  //   dataUrl = `https://api.tvmaze.com/search/people?q=${inputVal.name}`;
  // } else {

  //   if (inputVal.name.length > 0) {
  //     dataUrl = `https://api.tvmaze.com/search/shows?q=${inputVal.name}`;
  //   } else {
  //     dataUrl = `https://api.tvmaze.com/search/shows?q=friends`;
  //   }
  // }

  const actorFilter = () => {
    
    setActorfilter(true);
  }
  const movieFilter = () => {
 
    setActorfilter(false);
  }
  if (inputVal.name.length > 0) {
    dataUrl = "https://api.tvmaze.com/search/shows?q=friends";
  }
  if (actor) {
    dataUrl = `https://api.tvmaze.com/search/people?q=${inputVal.name}`;
  } else if (actor === false) {
    dataUrl = `https://api.tvmaze.com/search/shows?q=${inputVal.name}`;
  }

  console.log(dataUrl);

  const getMoviesList = async () => {
    try {
      let resposne = await fetch(dataUrl);
      let objData = await resposne.json();
      setMoviesData(objData);
    } catch (error) {

    }
  }
  useEffect(() => {
    getMoviesList();
  }, [inputVal])



  //  console.log(MoviesData);
  return (
    <>

      <div className="headerBackground">
        <nav className="navbar bg-transparent static-top">
          <div className="container">
            <h2 className="text-warning fw-bold">TV MAZE</h2>
          </div>
        </nav>
        <header>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <input
                  name="name"
                  type="text"
                  className="form-control shadow-none "
                  placeholder="Search movies....."
                  onChange={inputHandler}
                  value={inputVal.name}

                />
              </div>
            </div>
            <div className="row mt-3 ms-3">
              <div className="col-md-6">
                <input type="radio" name="category" onChange={actorFilter} />
                <span> Actor Name</span>
                <input type="radio" name="category" onChange={movieFilter} className="ms-4" />
                <span> Movie Name</span>
              </div>
            </div>
          </div>
        </header>
      </div>
      {actor ? <Actors data={MoviesData} /> : <Content data={MoviesData} />}

    </>
  );
};

export default Header;

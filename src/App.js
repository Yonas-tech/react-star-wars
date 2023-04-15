import { getStarshipsFromAPI } from "./services/Sw-api";
import StarshipCard from "./components/StrashipCard";
import { useEffect, useState } from 'react';


function App() {

  // useState to strore all ships' data
  const [allShipsArr, setAllShipsArr] = useState([]);
  const [nextURL, setNextURL]= useState(null);
  const [prevURL, setPrevURL]= useState(null);

  // API url
  const url = 'https://swapi.dev/api/starships';

  // console.log when allShipsArr is loaded
  useEffect(() => { console.log('data:'+ allShipsArr) }, [allShipsArr])

  // get apiData using the getStarshipsFromAPI(url) 
  const getData = async (url) => {
    // apiDataObj.keys = [count, next, previous, results]

    // load data
    let apiData = await getStarshipsFromAPI(url) 
    setAllShipsArr([...apiData.results]) 

    // update URLs
    setNextURL(apiData.next);
    setPrevURL(apiData.previous);
  }

  // run getData when the page loads
  useEffect(() => {
    getData(url);
  }, [])

  // function for next button
  let loadNext = function(){
    getData(nextURL)
  }

  // function for previous button
  let loadPrev = function(){
    getData(prevURL)
  }

// function if data is loaded
  function loaded() {
    return (
      <div className="App">
        <div className="header"><h1>STAR WARS STARSHIPS</h1></div>
        <div className="buttons">
          <button className="prev" onClick={loadPrev}>{'< Previous'}</button>
          <button className="next" onClick={loadNext}>{"Next >"}</button>
        </div>
 
         <div className="container">
          {allShipsArr.map((ship, idx) => {
            return (
              <StarshipCard shipObj={ship} key={idx} id={'ship' + idx} />
            )
          })}
        </div>
      </div>
    )
  }

  // function if data is not loaded
  function loading() {
    return (<h1>Loading .... </h1>)
  }

  return (
    allShipsArr != [] ? loaded() : loading()
  );
}

export default App;

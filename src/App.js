import { getStarshipsFromAPI } from "./services/Sw-api";
import StarshipCard from "./components/StrashipCard";
import { useEffect, useState } from 'react';


function App() {

  // useState to strore all ships' data
  const [allShipsArr, setAllShipsArr] = useState([]);
  const [shipsArr1, setShipsArr1] = useState([]);
  const [shipsArr2, setShipsArr2] = useState([]);
  const [shipsArr3, setShipsArr3] = useState([]);
  const [shipsArr4, setShipsArr4] = useState([]);


  // API url
  const url = 'https://swapi.dev/api/starships';

  // console.log when allShipsArr is loaded
  useEffect(() => { console.log('data:'+ allShipsArr) }, [allShipsArr])

  // get apiData using the getStarshipsFromAPI(url) async function
  const getData = async () => {
    // apiDataObj.keys = [count, next, previous, results]


    let apiData = await getStarshipsFromAPI(url) 
    setAllShipsArr([...apiData.results]) 

    // let i=2;
    //  while (apiData.next != null){   //for (i<=4; i++)  { 
    //   let oldData = allShipsArr; 
    //   let apiData = await getStarshipsFromAPI(url+'/?page='+i) 
    //   console.log('Next: ' + apiData.next)  
    //   setAllShipsArr([...oldData, ...apiData.results]) //  ???? this line is not adding the new data to allShipsArr, but replacing it
    //   i++;
    // }

  }

  // run getData when the page loads
  useEffect(() => {
    getData();
  }, [])

  function loaded() {
    return (
      <div className="App">
        <div className="header"><h1>STAR WARS STARSHIPS</h1></div>
        <div className="container">
          {allShipsArr.map((ship, idx) => {
            return (
              <StarshipCard
                shipObj={ship}
                key={idx}
                id={'ship' + idx}
              />
            )
          })}
        </div>
      </div>
    )
  }

  function loading() {
    return (<h1>Loading .... </h1>)
  }

  return (
    allShipsArr != [] ? loaded() : loading()
  );
}

export default App;

import { useEffect, useState } from "react";

const StarshipCard = (props) => {
    return ( 
        <div className="starship " id={props.id}>  
            <h2>{props.shipObj.name}</h2>
            <h3>Length: {props.shipObj.length}</h3>
            <h3>Crew: {props.shipObj.crew}</h3>
        </div>
     );
}
 
export default StarshipCard;
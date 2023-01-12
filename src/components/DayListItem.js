import React from "react";
import classNames from "classnames";
import "components/DaylistItem.scss";

export default function DayListItem(props) {
  
  let spotsFull = props.spots === 0 ? true : false;

  let listClass = classNames("day-list__item", {"day-list__item--selected": props.selected, "day-list__item--full": spotsFull})

  const formatSpots = () => {
  
    if (props.spots === 0) { // Function to alter output based on how many spots are remaining
      return "no spots remaining";
    } else if (props.spots === 1) {
      return `${props.spots} spot remaining`;
    }

    return `${props.spots} spots remaining`;
  };

  return (
    <li
      onClick={() => props.setDay(props.name)}
      className={listClass}
      data-testid="day"
    >
      
      <h2
        className="text--regular">{props.name}
      </h2>
      
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}


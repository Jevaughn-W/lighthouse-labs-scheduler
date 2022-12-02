import React from "react";
import classNames from "classnames";
import "components/DaylistItem.scss";

export default function DayListItem(props) {
  
  let spotsFull = props.spots === 0 ? true : false;

  let listClass = classNames("day-list__item", {"day-list__item--selected": props.selected, "day-list__item--full": spotsFull})

  return (
    <li
      onClick={() => props.setDay(props.name)}
      className={listClass}
    >
      
      <h2
        className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}


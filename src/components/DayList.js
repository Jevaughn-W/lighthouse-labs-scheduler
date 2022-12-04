import DayListItem from "./DayListItem";
import React from "react";


function DayList(props) {

  const DayListItems = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay} 
      />
    );
  });

  return (
    <ul>{DayListItems}</ul>
  )
};

export default DayList;


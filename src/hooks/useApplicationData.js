import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

   // Functions to handle state change
   const setDay = day => setState(prev =>({ ...prev, day }));
  
   // UseEffect to make API call to get days data on render
   
   useEffect(() => {
     
     const routes = {
       getDays: "http://localhost:8001/api/days",
       getAppointments: "http://localhost:8001/api/appointments",
       getInterviews: "http://localhost:8001/api/interviewers"
     };
     
     // Updating states with data obtained from axios requests
     Promise.all([
       axios.get(routes.getDays),
       axios.get(routes.getAppointments),
       axios.get(routes.getInterviews)
     ]).then((all) => {
       setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
     });
   }, [])

   
   // Function to add in new interview for the day
   function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (
      axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
        .then(()=> setState(prev => ({...prev, appointments})))
        .then(()=> numberOfSpots(true))
    );
  }

  // Function to make API request to remove interview
  function cancelInterview(id) {
    
    const appointment = {
      ...state.appointments[id], interview: null
    };

    const appointments = {
      ...state.appointments, [id]: appointment
    };
    

  
    return (
      axios.delete(`http://localhost:8001/api/appointments/${id}`)
        .then((res)=>  setState(prev => ({...prev, appointments})))
        .then(() => {numberOfSpots(false)})
    );
  }

  // Count the remaining spots

  function numberOfSpots(add) {
    let spots = 0;
    let days = [];
    let day = {};

    // Iterate through days object and if day == to current state edit state
    state.days.forEach((dayObj) => {
      if (dayObj.name === state.day) {
        spots = dayObj.spots;
        add ? spots -= 1: spots += 1;
        day = {...dayObj, spots};
        days.push(day);
      } else {
        days.push(dayObj);
      }
    })
    setState(prev => ({...prev, days}))
  }

  // Return functions
  return { state, setDay, bookInterview, cancelInterview };

}
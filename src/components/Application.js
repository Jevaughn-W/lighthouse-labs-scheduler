import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })
  
  let dailyAppointments = [];
  let dailyInterviewers = [];
  
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
  
  // Getting daily appointments
  dailyAppointments = getAppointmentsForDay(state, state.day);
  dailyInterviewers = getInterviewersForDay(state, state.day);
  
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

    setState(prev => ({...prev, appointments}));
  }
  // Function to render list of appointments after converting object to array
  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
      />
    )
  })


  // Main react component
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={day => setDay(day)}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" /> {/* Ad more props or better way to do this*/}
      </section>
    </main>
  );
}

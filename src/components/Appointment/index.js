import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );
    
    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer,
      };

      transition(SAVING);

      props.bookInterview(props.id, interview)
        .then(transition(SHOW));
        
      // transition(SHOW); // After saving, shows the appointment
       

    }

  return (
  <article className="appointment">
    <Header time={props.time}/>

    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
      />
    )}

    {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={() => back()}
        appointmentId={props.id}
      />
    )}

    {mode === SAVING && <Status/>}

  </article>)
}
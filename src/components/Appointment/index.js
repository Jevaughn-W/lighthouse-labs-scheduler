import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  
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
      .then((res)=> {
        transition(SHOW)
    });
  }

  function deleteAppointment() {
    transition(CONFIRM);
  }

  function deleteConfirmed() {
    transition(DELETING);
    props.cancelInterview(props.id);
    transition(EMPTY); // Empty the appointment once the information has been deleted. Need to work on a . then
  }
  
  return (
  <article className="appointment">
    <Header time={props.time}/>

    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onDelete={deleteAppointment}
        onEdit={() => transition(EDIT)}
      />
    )}

    {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
        appointmentId={props.id}
      />
    )}

    {mode === SAVING && (
      <Status
        message="Saving"
      />
    )}
    {mode === CONFIRM && (
      <Confirm
        onConfirm={deleteConfirmed}
        onCancel={back}
        message="Are you sure you would like to delete?"
      />
    )}
    {mode === DELETING && (
      <Status
      message="Deleting"
      />
    )}

    {mode === EDIT && (
      <Form
      interviewers={props.interviewers}
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        onSave={save}
        onCancel={back}
        appointmentId={props.id}
      />
    )}

  </article>)
}
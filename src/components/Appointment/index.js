import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  // Variables used to update which mode is shown

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  
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
        transition(SHOW)  // If save request resolves, show the appointment data
      })
      .catch((err) => {
        transition(ERROR_SAVE, true); // If an error occurs on the request, show the error component
    });
  }

  function deleteAppointment() { // If delete is clicked, function is called to transition to confirmation page
    transition(CONFIRM);
  }

  function deleteConfirmed() {  // If delete is confirmed, functionis called to update the interview object to null
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY) // Empty the appointment once the information has been deleted
      })
      .catch((err) => {
        transition(ERROR_DELETE, true); // If there is a server error, show the error component
      }); 
  }
  
  return (
    <article className="appointment" data-testid="appointment">
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
  
      {mode === ERROR_SAVE && (
        <Error
        message="Unable to save appointment"  
        onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Unable to delete appointment"
          onClose={back}
        />
      )}
  
    </article>
  )
}
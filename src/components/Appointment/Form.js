import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props)  {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setError("");
    setStudent(props.student || "");
    setInterviewer(props.interviewer || null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  const [error, setError] = useState("");

  function validate() {
    setError(""); // Resets error

    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
  
    props.onSave(student, interviewer);
  }

  return(
    <main className="appointment__card appointment__card--create"> {/*Main appoitmentment card - left section*/}
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event)=> event.preventDefault()}>
          <input
            value={student}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => {setStudent(event.target.value)}}
            data-testid="student-name-input"
            />
        </form>
        <section className="appointment__validation">{error}</section> {/*Should appear if there user submits empty interview or name*/}
        <InterviewerList 
          value={interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right"> {/*Main appoitmentment card - right section*/}
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={() => validate()} >Save</Button>
        </section>
      </section>
    </main>
  )
}
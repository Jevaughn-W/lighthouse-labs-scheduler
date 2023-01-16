import React from "react";

export default function Show(props) {
  return(
    <main className="appointment__card appointment__card--show"> {/* Main appointment card */}
      <section className="appointment__card-left"> {/* Shows details about the student and inteview if in Show mode */}
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{props.interviewer}</h3>
        </section>
      </section>
      <section className="appointment__card-right"> {/* Section containing edit and delete buttons which appear on hover */}
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={props.onDelete}
          />
        </section>
     </section>
    </main>
  )
}
import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import Proptypes from "prop-types";
import "./InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
    return (<InterviewerListItem
      key={interviewer.id}
      avatar={interviewer.avatar}
      name={interviewer.name}
      setInterviewer={() => props.onChange(interviewer.id)}
      selected={props.value === interviewer.id}
    />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: Proptypes.array.isRequired
};
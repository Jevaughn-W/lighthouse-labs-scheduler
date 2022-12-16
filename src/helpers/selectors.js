// Selector function to obtain the appointments for a particular day

export function getAppointmentsForDay(state, day) {

  let result = [];
  let appointmentsForDay;

  state.days.forEach((dayObj) => {
    if (dayObj.name === day) {
      appointmentsForDay = dayObj.appointments
    }
  });

  if (appointmentsForDay === undefined) {
    return result;
  } 
  
  appointmentsForDay.forEach((appointment) => {
    if (state.appointments[appointment]) {
      result.push(state.appointments[appointment]);
    }
  });

  return result;

}

// Selector function to obtain the interview object based on the interviewer id passed in

export function getInterview(state, interview) {
  
  let result = {};

  if (interview === null) {
    return null;
  };

  const arrayOfInterviewers =  Object.values(state.interviewers);

  arrayOfInterviewers.forEach((interviewer) => {
    if (interviewer.id === interview.interviewer) {
      result = {student: interview.student, interviewer}
    };
  })

  return result;
}

// Selector to pull information for on the interviewers for day selected

export function getInterviewersForDay(state, day) {
  let result = [];
  let interviewersForDay;

  state.days.forEach((dayObj) => {
    if (dayObj.name === day) {
      interviewersForDay = dayObj.interviewers;
    }
  });

  if (interviewersForDay === undefined) {
    return result;
  } 
  
  interviewersForDay.forEach((interviewer) => {
    if (state.interviewers[interviewer]) {
      result.push(state.interviewers[interviewer]);
    }
  });

  return result;
}
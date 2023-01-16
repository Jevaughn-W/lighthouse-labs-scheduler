// Selector function to obtain the appointments for a particular day

export function getAppointmentsForDay(state, day) {

  let result = [];
  let appointmentsForDay;

  state.days.forEach((dayObj) => {  // Iterate through each day array passed to state
    if (dayObj.name === day) {
      appointmentsForDay = dayObj.appointments // Passes the the appointments containing array of ids
    }
  });

  if (appointmentsForDay === undefined) { // If there are no appointments in the variable return empty
    return result;
  } 
  
  appointmentsForDay.forEach((appointment) => {
    if (state.appointments[appointment]) { // Check each appointment is a truthy and the push to array of appointment
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

  const arrayOfInterviewers =  Object.values(state.interviewers); // Convert array to an array

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
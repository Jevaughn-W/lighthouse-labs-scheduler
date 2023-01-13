import React from "react";
import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByPlaceholderText, getByAltText, queryByText, queryByAltText} from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    
    const { getByText } = render(<Application/>);
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(()=> getByText(container, "Archie Cohen"));
    
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    

    const days = getAllByTestId(container, 'day')
    const day = days.find(element => element ="monday")
    expect(queryByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    // 1. Render the Application
    const { container, debug } = render(<Application/>);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    // 2. Click on the delete button
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    
    // 3. Click on the yes button of the confirm delete appointment component 
    fireEvent.click(getByText(appointment, "Confirm"));
    
    // 4. Check that the element with the text "Deleting" is displayed
    expect(queryByText(appointment, "Deleting")).toBeInTheDocument();
   
    // 5. Wait for the "add" button to appear
    await waitForElement(() => queryByAltText(appointment, "Add"))

    
    // 6. Check that the Daylist with the text "Monday" also has 2 spots remaining
    const days = getAllByTestId(container, 'day')
    const day = days.find(element => element ="monday")
    expect(queryByText(day, "2 spots remaining")).toBeInTheDocument();
  });
  

});
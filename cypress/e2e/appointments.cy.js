describe("Appointments", () => {
  
  beforeEach(()=>{
    cy.request("GET", "/api/debug/reset"); //Needed to reset the database since Cypress automatically restarts
    cy.visit("/");
    cy.contains("Monday");

  })
  
  it("should book an interview", () => {
    
    cy.get("[alt=Add]")
      .first()
      .click();
  
    cy.get("input")
      .type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']")
      .click();
    
    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .click({force: true}); // Force true is used to click the invisible element
    
      cy.get("input")
      .clear()
      .type("Lydia Miller-Jones");

    cy.get("[alt='Tori Malcolm']")
      .click();
    
    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({force: true});

    cy.contains("Confirm")
      .click()

    cy.get(".appointment__card--status")
    .contains("Deleting").should("exist");
    
    cy.get(".appointment__card--status").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should('not.exist');

  });

});
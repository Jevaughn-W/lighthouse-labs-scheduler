describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
    
  });

  it("should click on Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected",);
  });

});
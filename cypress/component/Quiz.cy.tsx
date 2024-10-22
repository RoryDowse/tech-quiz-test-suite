import React from 'react';
import Quiz from '../../client/src/components/Quiz';

describe("<Quiz />", () => {
  it("should start the quiz and present a question", () => {
    cy.mount(<Quiz />);

    // Ensure the Start Quiz button exists and click it
    cy.get('[data-cy="start-quiz"]').should("exist").click();

    // Verify that the first question is presented
    cy.get('[data-cy="quiz-question"]').should("exist").and("not.be.empty");
  });
});

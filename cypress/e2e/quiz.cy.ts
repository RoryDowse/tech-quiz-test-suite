import { mockState } from '../support/utils/helpers';
import { Question } from '../support/types';

describe('Tech Quiz Game Cycle', () => {
  context('Game Setup', () => {
    beforeEach(() => {
      // Intercept the API request for fetching random questions
      cy.intercept('GET', '/api/questions/random', {
        statusCode: 200,
        body: [mockState, mockState],
        // [
        //   // Mock questions as per your API response structure
        //   {
        //     question: 'What is the capital of France?',
        //     answers: [
        //       { text: 'Paris', isCorrect: true },
        //       { text: 'London', isCorrect: false },
        //       { text: 'Berlin', isCorrect: false },
        //       { text: 'Rome', isCorrect: false },
        //     ],
        //   },
        //   {
        //     question: 'What is 2 + 2?',
        //     answers: [
        //       { text: '3', isCorrect: false },
        //       { text: '4', isCorrect: true },
        //       { text: '5', isCorrect: false },
        //       { text: '6', isCorrect: false },
        //     ],
        //   },
        // ], // Replace with mock questions as needed
      }).as('getRandomQuestions');
        
        cy.visit('/');
      });

      it("should start the quiz and present the first question", () => {

      // Ensure the start button exists and click it
      cy.get('[data-cy="start-quiz"]').should("exist").click();

      // Wait for the API call to complete
      cy.wait('@getRandomQuestions').its('response.statusCode').should('eq', 200);

      // Verify that the first question is displayed
      cy.get('[data-cy="quiz-question"]').should("exist").and("not.be.empty");
      
    });

    it('should present another question after answering the first one', () => {
      // Start the quiz
      cy.get('[data-cy="start-quiz"]').click();
      cy.wait('@getRandomQuestions');

      // Verify first question is loaded
      cy.get('[data-cy="quiz-question"]').should('contain', 'Which of the following statements is used to handle exceptions in Python?');

      // Answer the question correctly
      cy.get('[data-cy="next-question"]').eq(1).click(); 

      // Verify that the next question is displayed
      cy.get('[data-cy="quiz-question"]').should('contain', 'Which of the following statements is used to handle exceptions in Python?');
    });

    it('should complete the quiz and show the score', () => {
      // Start the quiz
      cy.get('[data-cy="start-quiz"]').click();
      cy.wait('@getRandomQuestions');

      // Answer the first question (correct)
      cy.get('[data-cy="next-question"]').eq(1).click();

      // Answer the second question (correct)
      cy.get('[data-cy="next-question"]').eq(1).click();

      // Check that the quiz is completed
      cy.get('[data-cy="quiz-completed"]').should('exist');

      // Check if the score is displayed
      cy.get('[data-cy="score"]').should('exist');
    });

    it('should allow restarting the quiz after completion', () => {
      // Start the quiz
      cy.get('[data-cy="start-quiz"]').click();
      cy.wait('@getRandomQuestions');

      // Answer the questions
      cy.get('[data-cy="next-question"]').eq(1).click();

      // Answer the second question (correct)
      cy.get('[data-cy="next-question"]').eq(1).click();

      // Verify the quiz is completed
      cy.get('[data-cy="quiz-completed"]').should('exist');

      // Restart the quiz
      cy.get('button').contains('Take New Quiz').click();

      // Verify the quiz area is reset for a new game
      cy.get('[data-cy="quiz-question"]').should('exist');
      cy.get('[data-cy="quiz-completed"]').should('not.exist');
    });
  });
});

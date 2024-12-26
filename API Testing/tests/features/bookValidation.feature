@mandatory-fields
Feature: Book Update Mandatory Fields Validation
  As a librarian
  I want to validate book update mandatory fields
  So that data integrity is maintained

  Background:
    Given I am authenticated as "admin" user with "password"

  @success-case
  Scenario: Update Book with Valid Details
    When I perform book update with valid data
      | id | title              | author         |
      | 3  | Updacted Book Title | Updacted Author |
    Then API should respond with status code 200
    And API should return message "Book details updated successfully"

  @no-title
  Scenario: Update Book without Title
    When I perform book update without title
      | id | title | author         |
      | 3  |       | Updated Author |
    Then API should respond with status code 400
    And API should return message "Invalid | Empty Input Parameters in the Request"

  @no-author
  Scenario: Update Book without Author
    When I perform book update without author
      | id | title              | author |
      | 1  | Updated Book Title |        |
    Then API should respond with status code 400
    And API should return message "Invalid | Empty Input Parameters in the Request"
Feature: Create Book API Tests
  As a user of the library system
  I want to test the create book functionality
  So that I can ensure it handles various scenarios correctly

  Background:
    Given I am logged in with valid credentials

  @missing-title
  Scenario: Create a book without a title
    When I create a book with the following details:
      | title | author |
      |       | cha    |
    Then the response status code 400
    And the response message "Mandatory parameter 'title' is missing."

  @missing-author
  Scenario: Create a book without an author
    When I create a book with the following details:
      | title   | author |
      | book00  |        |
    Then the response status code 400
    And the response message "Mandatory parameter 'author' is missing."

  @invalid-id
  Scenario: Create a book with invalid ID type
    When I create a book with the following details:
      | id   | title  | author |
      | abc  | Book8  | John   |
    Then the response status code 400
    And the response message "Invalid parameter 'id'."

  @valid-request
  Scenario: Successfully create a book
    When I create a book with the following details:
      | id   | title     | author |
      | 1056 | Book1056  | saman  |
    Then the response status code 201
    And the response message "Book created successfully."

  @duplicate-title
  Scenario: Create a book with a duplicate title
    When I create a book with the following details:
      | id   | title | author |
      | 124  | Book8 | Jane   |
    Then the response status code 409
    And the response message "A book with the same title already exists."

  @duplicate-book
  Scenario: Create a new book with the existing bookname and author
    When I create a book with the following details:
      | id   | title  | author |
      | 666  | Book8  | Chaami |
    Then the response status code 409
    And the response message "Book Already Exists."

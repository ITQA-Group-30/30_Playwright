Feature: Create Book API Tests
  As a user of the library system
  I want to test the create book functionality
  So that I can ensure it handles various scenarios correctly

  Background:
    Given I am logged in with valid credentials

  @missing-title
  Scenario: Create a book without a title
    When I create a book with the following details:
      | title   | author    |
      |         | "cha" |
    Then the response status code should be a 400
    And the response message should be "Mandatory parameter 'title' is missing."

  @missing-author
  Scenario: Create a book without an author
    When I create a book with the following details:
      | title        | author |
      | "book00" |         |
    Then the response status code should be 400
    And the response message should be "Mandatory parameter 'author' is missing."

  @valid-request
  Scenario: Successfully create a book
    When I create a book with the following details:
      | id   | title        | author     |
      | 1066 | "Book1066" | "saman" |
    Then the response status code should be 201
    And the response message should be "Book created successfully."

@update
Feature: Update Book API Tests
  As a user of the library system
  I want to test the update book functionality
  So that I can ensure it handles various scenarios correctly

  Background: 
    Given I am logged in as "admin" with password "password"

  @invalid-id
  Scenario: Invalid Data Type for ID
    When I try to update a book with invalid ID type
      | id  | title              | author          |
      | abc | Updated Book Title | Updated Author  |
    Then the response status code should be 400
    And the response message should be "Invalid | Empty Input Parameters in the Request."

  @empty-body
  Scenario: Empty Request Body
    When I try to update a book with empty body
      | id |
      | 1  |
    Then the response status code should be 400
    And the response message should be "Invalid | Empty Input Parameters in the Request."

  @non-existent
  Scenario: Update Non-Existent Book
    When I try to update a non-existent book
      | id  | title              | author          |
      | 2 | Updated Book Title | Updated Author  |
    Then the response status code should be 404
    And the response message should be "Book is not found."
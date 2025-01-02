Feature: Update Book API Tests
  As a user of the library system
  I want to test the update book functionality
  So that I can ensure it handles various scenarios correctly

  Background:
    Given I am logged in as aa "admin" with password "password"

  @success
  Scenario: Successfully Update a Book
    When I try to update a book with valid details
      | id | title              | author          |
      | 1  | Updated Book Title | Updated Author  |
    Then the response status code should be aa 200
    And the response message should be aa "Book details updated successfully"

  @invalid-id
  Scenario: Invalid Data Type for ID
    When I try to update a book with invalid ID type
      | id  | title              | author          |
      | abc | Updated Book Title | Updated Author  |
    Then the response status code should be aa 400
    And the response message should be aa "Invalid | Empty Input Parameters in the Request"

  @empty-body
  Scenario: Empty Request Body
    When I try to update a book with empty body
      | id |
      | 1  |
    Then the response status code should be aa 400
    And the response message should be aa "Invalid | Empty Input Parameters in the Request"

  @non-existent
  Scenario: Update Non-Existent Book
    When I try to update a non-existent book
      | id  | title              | author          |
      | 999 | Updated Book Title | Updated Author  |
    Then the response status code should be 404
    And the response message should be "Book is not found"

  @unauthorized
  Scenario: Update Book Without Authentication
    When I try to update a book without authentication
      | id | title              | author          |
      | 1  | Updated Book Title | Updated Author  |
    Then the response status code should be 401
    And the response message should be "Unauthorized"

  @forbidden
  Scenario: Update Book With Regular User
    Given I am logged in as "user" with password "password"
    When I try to update a book with valid details
      | id | title              | author          |
      | 1  | Updated Book Title | Updated Author  |
    Then the response status code should be 403
    And the response message should be "Request api call is forbidden"
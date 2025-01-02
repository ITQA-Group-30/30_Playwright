# File: tests/features/deleteBook.feature
Feature: Delete Book API Tests
  As an admin or user of the library system
  I want to test the delete book functionality
  So that I can ensure it handles various scenarios correctly

  Background:
    Given I am logged in as "admin" with password "password"

  @delete-existing-book
Scenario: Successfully delete an existing book
  Given a book with ID 1 exists in the system
  When I delete the book with ID 1
  Then the response status code should be 200
  And the response message should be "Book deleted successfully."

  @delete-nonexistent-book
  Scenario: Attempt to delete a book that does not exist
    When I delete the book with ID 999
    Then the response status code should be 404
    And the response message should be "Book not found."

  @unauthorized-delete
  Scenario: Attempt to delete a book as an unauthorized user
    Given I am logged in as "user" with password "password"
    When I delete the book with ID 102
    Then the response status code should be 403
    And the response message should be "You are not authorized to delete the book."

  @invalid-id
  Scenario: Attempt to delete a book with an invalid ID
    When I delete the book with ID "abc"
    Then the response status code should be 400
    And the response message should be "Invalid parameter 'id'."

  @delete-without-authentication
  Scenario: Attempt to delete a book without authentication
    Given I am not logged in
    When I delete the book with ID 103
    Then the response status code should be 401
    And the response message should be "You are not authorized to delete the book."

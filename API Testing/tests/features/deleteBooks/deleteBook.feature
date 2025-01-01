Feature: Delete a book from the library system

  Background:
    Given the application is running

  Scenario: Successfully delete an existing book
    Given a book exists with ID 1
    When I send a DELETE request to "/api/books/1"
    Then the response status should be 200
    And the book should no longer exist

  Scenario: Try to delete a non-existent book
    When I send a DELETE request to "/api/books/999"
    Then the response status should be 404

  Scenario: Unauthorized user tries to delete a book
    Given I am logged in as "user"
    When I send a DELETE request to "/api/books/1"
    Then the response status should be 401

  Scenario: Delete a book without providing authentication
    When I send a DELETE request to "/api/books/1" without authentication
    Then the response status should be 401

  Scenario: Delete a book using an invalid ID
    When I send a DELETE request to "/api/books/abc"
    Then the response status should be 400

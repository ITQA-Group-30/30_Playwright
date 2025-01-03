Feature: Delete Books API
  Scenario: Successfully delete an existing book
    Given I am logged in as an authorized admin user
    When I delete the book with ID 6
    Then the response status code should be 200
    And the response message should be "Book deleted successfully."

  Scenario: Attempt to delete a book that does not exist
    Given I am logged in as an authorized admin user
    When I delete the book with ID 999
    Then the response status code should be 404
    And the response message should be "Book not found."

  Scenario: Attempt to delete a book as an unauthorized user
    Given I am logged in as an unauthorized user
    When I delete the book with ID 102
    Then the response status code should be 403
    And the response message should be "You are not authorized to delete the book."

  Scenario: Attempt to delete a book with an invalid ID
    Given I am logged in as an authorized admin user
    When I delete the book with ID "abc"
    Then the response status code should be 400
    And the response message should be "Invalid parameter 'id'."

  Scenario: Attempt to delete a book without authentication
    Given I am not logged in
    When I delete the book with ID 103
    Then the response status code should be 401
    And the response message should be "You are not authorized to delete the book."

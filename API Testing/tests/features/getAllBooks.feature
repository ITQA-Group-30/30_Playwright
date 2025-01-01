@getbooks
Feature: Retrieve Books from the Library

  @getbooks
  Scenario: Valid Request with Books in Database
    Given I am logged in as "user" with password "password"
    And there are books in the database
    When I send a GET request to /api/books
    Then the response status code should be 200
    And the response should contain a list of books

  Scenario: Valid Request with No Books in Database
    Given I am logged in as "user" with password "password"
    And the database has no books
    When I send a GET request to /api/books
    Then the response status code should be 200
    And the response should contain an empty array

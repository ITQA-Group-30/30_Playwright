@getbooks
Feature: Retrieve Books from the Library

  @getbooks
  Scenario: Valid Request with Books in Database
    Given I am logged in as a "user" with password "password"
    And there are books in the database
    When I send a GET request to
    Then the response status code should be 200
    And the response should contain a list of books

  Scenario: Valid Request with No Books in Database
    Given I am logged in as a "user" with password "password"
    And the database has no books
    When I send a GET request to
    Then the response status code should be 400
    And the response should contain an empty array

  Scenario: Unauthorized Request
    Given I am logged in with an invalid "user" with password "wrongPassword"
    When I send a GET request to
    Then the response status code should be 401
    And the response should indicate an unauthorized access

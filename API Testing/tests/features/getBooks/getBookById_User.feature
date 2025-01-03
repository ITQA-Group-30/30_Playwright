@smoke
Feature: Retrieve Book Details by ID (User)

  @smoke
  Scenario: Valid Request with Valid Book ID
    Given a book exists in the database with a valid id
    When a user sends a GET request to {id}
    Then the response status code should be 200
    And the response should contain the correct book details for the given id

  Scenario: Unauthorized Request to Retrieve Book by ID
    Given the user is not authorized
    When a user sends a GET request to {id} with an invalid token
    Then the response status code should be 401
    And the response should indicate unauthorized access


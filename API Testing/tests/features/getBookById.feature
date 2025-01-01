@smoke
Feature: Retrieve Book Details by ID

  @smoke
  Scenario: Valid Request with Valid Book ID
    Given a book exists in the database with a valid id
    When I send a GET request to /api/books/{id}
    Then the response status code should be 200
    And the response should contain the correct book details for the given id

  Scenario: Invalid Request with Invalid Book ID
    Given no book exists in the database with the given id
    When I send a GET request to /api/books/{id} with an invalid id
    Then the response status code should be 404
    And the response should indicate that the book was not found

  Scenario: Unauthorized Request to Retrieve Book by ID
    Given the user is not authorized
    When I send a GET request to /api/books/{id} with an invalid authorization token
    Then the response status code should be 401

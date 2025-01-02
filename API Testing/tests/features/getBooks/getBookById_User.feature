Feature: Retrieve Books by ID

  @InvalidID
  Scenario: Invalid Request with Invalid Book ID
    Given no book exists in the database with the given id
    When I send a GET request to "/api/books/{id}" with an invalid id
    Then the response status for invalid book ID should be 404
    And the response should indicate that the book was not found

  @UnauthorizedAccess
  Scenario: Unauthorized Request to Retrieve Book by ID
    Given the user is not authorized
    When I send a GET request to "/api/books/{id}" with an invalid authorization token
    Then the response status for unauthorized access should be 401

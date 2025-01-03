# @smoke
# Feature: Retrieve Book Details by ID (User)

#   @smoke
#   Scenario: Valid Request with Valid Book ID
#     Given a book exists in the database with a valid id
#     When a user sends a GET request to {id}
#     Then the response status code should be 200
#     And the response should contain the correct book details for the given id

#   Scenario: Unauthorized Request to Retrieve Book by ID
#     Given the user is not authorized
#     When a user sends a GET request to {id} with an invalid token
#     Then the response status code should be 401
#     And the response should indicate unauthorized access



Feature: Validate GET /api/books/{id} API for User Role

  Scenario: Retrieve a book with a valid ID
    Given I am logged in as a user
    When I send a GET request to "/api/books/1"
    Then I should receive a 200 response
    And the response should contain book details

  Scenario: Retrieve a non-existing book
    Given I am logged in as a user
    When I send a GET request to "/api/books/9999"
    Then I should receive a 404 response
    And the response should say "Book not found"

  Scenario: Retrieve a book with an empty ID
    Given I am logged in as a user
    When I send a GET request to "/api/books/"
    Then I should receive a 400 response
    And the response should say "Invalid or empty input parameters in the request"

  Scenario: Retrieve a book with a non-integer ID
    Given I am logged in as a user
    When I send a GET request to "/api/books/abc"
    Then I should receive a 400 response
    And the response should say "Invalid or empty input parameters in the request"

  Scenario: Unauthorized access
    Given Im not logged in
    When I send a GET request to "/api/books/1"
    Then I should receive a 401 response
    And the response should say "Unauthorized"
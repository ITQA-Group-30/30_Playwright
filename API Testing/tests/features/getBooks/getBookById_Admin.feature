@getBookById_Admin
Feature: Admin Retrieve Book Details by ID

  @getBookById_Admin
  Scenario: Valid Admin Request with Valid Book ID
    Given an admin creates a book in the database with a valid id
    When the admin sends a GET request to {id}
    Then the admin response status code should be 200
    And the admin response should contain correct book details for the given id

  Scenario: Admin Request for a Non-existent Book
    Given a book does not exist in the database with the given id for admin
    When the admin sends a GET request to {id} for a non-existent book
    Then the admin response status code should be 404
    And the admin response should indicate that the book was not found

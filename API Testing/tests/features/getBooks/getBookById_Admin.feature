@getBookById_Admin
Feature: Admin Retrieve Book Details by ID

  @getBookById_Admin
  Scenario: Valid Admin Request with Valid Book ID
    Given an admin creates a book in the database with a valid id
    When the admin sends a GET request to {id}
    Then the admin response status code should be 200
    And the admin response should contain correct book details for the given id


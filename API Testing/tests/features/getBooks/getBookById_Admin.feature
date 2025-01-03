Feature: Admin Retrieve Book Details by ID
  As an admin user
  I want to retrieve book details by ID
  So that I can view specific book information

  Background:
    Given I am authenticated as admin user

  @getBookById_Admin_Negative
  Scenario: Admin Request with Negative Book ID
    When the admin sends a GET request with negative book id "-1"
    Then the admin response status code should be 404
    And the error message should be "Book is not found"

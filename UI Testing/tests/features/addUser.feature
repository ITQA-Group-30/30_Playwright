Feature: Add User to OrangeHRM

  Scenario: Admin adds a new user
    Given I am on the Admin page
    When I click on the "Add User" button
    And I fill in the user details
    And I click "Save"


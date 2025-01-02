Feature: Admin User Management
  As an admin user
  I want to manage system users
  So that I can control system access

  Scenario: Search for system users
    Given I am on the admin page
    When I search for user "Shehan Владилен"
    Then I should see user records in the results
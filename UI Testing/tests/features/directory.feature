Feature: Employee Directory
  As a user
  I want to use the employee directory
  So that I can find employee information

  Scenario: Search for employees in directory
    Given I am on the directory page
    When I search for employee "John  Doe"
    Then I should see employee cards in the results
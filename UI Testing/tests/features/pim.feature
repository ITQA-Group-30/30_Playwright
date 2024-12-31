Feature: PIM Employee Management
  As an HR admin
  I want to manage employee information
  So that I can maintain employee records

  Scenario: Search for employee records
    Given I am on the PIM page
    When I search for employee "John"
    Then I should see employee records in the results
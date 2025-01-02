Feature: Leave Management
  As an employee
  I want to view leave requests
  So that I can track leave status

  Scenario: View leave requests
    Given I am on the leave page
    When I search for leave requests
    Then I should see leave records in the results
Feature: Delete Employee
  As an HR admin
  I want to delete employee records
  So that I can maintain accurate employee data

  Scenario: Successfully delete an employee
    Given I am on the PIM page a
    When I search for employee with id "0295"
    And I delete the employee
    Then the employee should be successfully deleted
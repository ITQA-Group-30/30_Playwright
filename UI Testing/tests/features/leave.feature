Feature: Leave Management
  As an employee
  I want to view and filter leave requests
  So that I can track leave status

  Scenario: Filter and view leave requests
    Given I am on the leave page
    When I filter leave requests with the following criteria:
      | fromDate     | 2024-01-01    |
      | toDate       | 2024-12-31    |
      | leaveType    | US - Vacation      |
      | employeeName | John Smith    |
      | statuses     | Rejected |
    Then I should see 4 leave records in the results

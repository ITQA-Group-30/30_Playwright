Feature: View and Submit Performance Review

  Scenario: Search for employee and submit the TimeSheet review
    Given I am on the Time Sheet page
    When I search for a user "John Luther Doe"
    Then I click the "View" button
    

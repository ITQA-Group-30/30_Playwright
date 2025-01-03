Feature: Search Performance Review by Job Title

  Scenario: Search for employees with the job title "Automation Tester"
    Given I am on the Performance Review page
    When I select the employee name "xyz"
    Then I select the default From date and To date
    

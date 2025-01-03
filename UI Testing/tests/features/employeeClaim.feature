Feature: Search with specific details

  Scenario: User searches with specific criteria
    Given I am on the Employee Claim page
    When I search for employee "abc" with reference ID "12345"
    When I select event name and status
    Then the search results should display relevant data

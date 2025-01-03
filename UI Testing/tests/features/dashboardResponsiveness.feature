Feature: Dashboard Page Responsiveness

  Scenario Outline: Verify dashboard layout across different screen sizes
    Given I am on the Dashboard page
    When the screen size is set to <width> and <height>
    Then the dashboard layout should adjust properly

  Examples:
    | width | height |
    | 1920  | 1080   |
    | 768   | 1024   |
    | 375   | 667    |

Feature: login for mercury newtours

  Scenario: login with valid username and passwrod
    Given providing valid url
    When providing valid username and passwrod
    Then clicking login button

  Scenario: login with valid username and passwrod pass value in step
    Given providing valid url
    When providing valid username as "mercury" and passwrod as "mercury"
    Then clicking login button
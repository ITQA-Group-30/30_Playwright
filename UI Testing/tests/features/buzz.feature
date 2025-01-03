Feature: Create a post on the Buzz page

  Scenario: User successfully posts on Buzz
    Given I am on the Buzz page
    When I create a new post with "Hello OrangeHRM Buzz!"
    When I click the "Post" button
    

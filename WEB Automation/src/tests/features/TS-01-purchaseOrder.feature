@TS-01
Feature: TS-01 Purchase flow on SauceDemo

  Background:
    Given User Login Username as "standard_user" and Password as "secret_sauce"

  Scenario: Purchase Order
    Given Should open "Inventory" screen
    When User add all items to cart
    When User click "Shopping Cart" button
    Then Should open "Cart" screen
    When User remove the third item from the cart
    When User click "Checkout" button
    Then Should open "checkout-step-one" screen
    When User set data in "checkout-step-one"
      | firstName  | John |
      | lastName   | Doe  |
      | postalCode | 4023 |
    When User click "Continue" button
     Then Should open "checkout-step-two" screen
     Then Should verify "checkout overview" details
    When User click "Finish" button
    Then Should open "checkout-complete" screen
    Then Should verify the order confirmation
    When User click "Back Home" button
    Then Should open "Inventory" screen


# Scenario_1
# 1. Log in as a `standard user`
# 2. Add all item to the cart
# 3. Go to the cart
# 4. Find third item and remove it from the cart
# 5. Validate in the Checkout Overview that it only contains 
#the items that you want to purchase, as well as the total count of 
#items
# 6. Finish the purchase
# 7. Validate that the website confirms the order

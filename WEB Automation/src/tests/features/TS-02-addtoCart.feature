@TS-02
Feature: TS-02 Add to cart flow on SauceDemo

  Scenario: Add products to cart
    Given User Login Username as "problem_user" and Password as "secret_sauce"
    Given Should open "Inventory" screen
    When User selected one item
    When User add item to cart
    When User click "Shopping Cart" button
    Then Should open "Cart" screen
    Then Should verify item details


# Scenario_2
# 1. Log in as a `problem_user`
# 2. Find one item by name, click on the item
# 3. Add it to the cart from item page
# 4. Go to the cart
# 5. Validate that item was added
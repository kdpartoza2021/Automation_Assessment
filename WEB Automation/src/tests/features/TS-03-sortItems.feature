@TS-03
Feature: TS-03 Sort products flow on SauceDemo

  Scenario: Sort products
    Given User Login Username as "standard_user" and Password as "secret_sauce"
    When Should open "Inventory" screen
    When User Sort products by name
    Then Should verify sorted items



# Scenario_3:
# 1. Log in as a `standard user`
# 2. Sort products by name
# 3. Validate that items sorted as expected
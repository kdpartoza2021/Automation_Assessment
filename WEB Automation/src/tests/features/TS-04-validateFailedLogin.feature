@TS-04
Feature: TS-04 Validate Failed Login flow on SauceDemo

  Scenario: Validate Failed Login
    Given User Login Username as "locked_out_user" and Password as "secret_sauce"
    Then User should see login error


# Scenario_4:
# 1. Log in as a `locked_out_user`
# 2. Validate that login failed
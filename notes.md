# Database Tables

## User

user_id
name
email
password
created_at
updated_at

## Admin

admin_id
user_id
created_at
updated_at

## Product

product_id
name
description
starting_price
bidding_end_time
highest_bid
user_id
created_by (admin_id)
created_at
updated_at

## Requirements

- Admins can add products, users can place bids on each product, and the highest bidder wins after the bidding period ends.
- A bid can only be placed if and only if it's higher than the current bid
- Bids for a given product cannot be placed after the bidding end time.
- Highest bid for a given product should be highlighted alongside the product after bidding ends/ is closed (admins can specify an end time or manually close bidding).

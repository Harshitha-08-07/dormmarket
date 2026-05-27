# Dorm Marketplace PRD

## 1. Scope Cut

1. Online Payments
Reason: Payment integration is unnecessary for the Day 1 MVP.

2. Live Chat
Reason: Messaging adds extra complexity not required for core marketplace flow.

3. Delivery Tracking
Reason: Marketplace only supports campus handoff.

---

## 2. MVP Features

1. Create item listings

2. View available items

3. Claim and confirm pickup

---

## 3. Acceptance Criteria

### AC1
Given an item is available
When a student clicks Claim Item
Then the item becomes Claimed.

### AC2
Given an item is already claimed
When another student tries to claim it
Then the system shows Item No Longer Available.

### AC3
Given a claim expires before pickup confirmation
When the timer finishes
Then the item becomes Available again.
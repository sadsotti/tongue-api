#!/bin/bash

BASE_URL="http://localhost:3000/api"

echo "--------------------------------------------"
echo " TONGUE API AUTOMATED TESTS "
echo "--------------------------------------------"

# Function: extract numeric ID from response JSON
extract_id() {
    echo "$1" | sed -n 's/.*"id":\([0-9]*\).*/\1/p'
}

# Check HTTP code success
check() {
    if [ "$1" -ne "$2" ]; then
        echo "[FAILED] $3 (expected $2, got $1)"
        exit 1
    else
        echo "[OK] $3"
    fi
}

#############################################
# 1) CREATE USER
#############################################
echo "==> 1) Creating user..."

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/users" \
  -H "Content-Type: application/json" \
  -d "{\"nickname\":\"Lorenzo\",\"age\":30,\"city\":\"Milan\"}")

BODY=$(echo "$RESPONSE" | head -n 1)
CODE=$(echo "$RESPONSE" | tail -n 1)

check "$CODE" 201 "User creation"

USER_ID=$(extract_id "$BODY")
echo "User ID: $USER_ID"


#############################################
# 2) CREATE POST
#############################################
echo "==> 2) Creating post..."

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/posts" \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"My test post\",\"createdAt\":\"2025-01-10\"}")

BODY=$(echo "$RESPONSE" | head -n 1)
CODE=$(echo "$RESPONSE" | tail -n 1)

check "$CODE" 201 "Post creation"

POST_ID=$(extract_id "$BODY")
echo "Post ID: $POST_ID"


#############################################
# 3) CREATE INTERACTION
#############################################
echo "==> 3) Creating interaction..."

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/interactions" \
  -H "Content-Type: application/json" \
  -d "{\"type\":\"like\",\"interaction_time\":\"2025-01-10 10:00:00\",\"post_id\":$POST_ID,\"user_id\":$USER_ID}")

BODY=$(echo "$RESPONSE" | head -n 1)
CODE=$(echo "$RESPONSE" | tail -n 1)

check "$CODE" 201 "Interaction creation"

echo
echo "--------------------------------------------"
echo " ALL TESTS PASSED SUCCESSFULLY 🎉"
echo "--------------------------------------------"

read -p "Press ENTER to exit..."

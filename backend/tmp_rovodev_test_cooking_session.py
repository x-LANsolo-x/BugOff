"""
Phase 2 Test: Cooking Session API Integration
Tests the complete cooking session flow
"""
import asyncio
import sys
import httpx

BASE_URL = "http://localhost:8000/api/v1"

async def test_cooking_session_flow():
    print("=" * 60)
    print("🧪 PHASE 2 TEST: Cooking Session API Integration")
    print("=" * 60)
    print()
    
    async with httpx.AsyncClient(timeout=10.0) as client:
        # Step 1: Login (get auth token)
        print("Step 1: 🔐 Authenticating...")
        try:
            login_response = await client.post(
                f"{BASE_URL}/auth/google",
                json={"id_token": "fake_token"}
            )
            if login_response.status_code != 200:
                print(f"   ❌ Login failed: {login_response.status_code}")
                return
            
            auth_data = login_response.json()
            token = auth_data.get("access_token")
            user_id = auth_data.get("user", {}).get("id")
            print(f"   ✅ Logged in as user: {user_id}")
            print(f"   Token: {token[:20]}...")
            print()
        except Exception as e:
            print(f"   ❌ Login error: {e}")
            return
        
        # Set auth header for subsequent requests
        headers = {"Authorization": f"Bearer {token}"}
        
        # Step 2: Get a recipe (or use a known recipe ID)
        print("Step 2: 📖 Fetching recipes...")
        try:
            recipes_response = await client.get(f"{BASE_URL}/recipes", headers=headers)
            recipes = recipes_response.json()
            
            # For testing, we'll create a simple recipe ID
            # In real scenario, you'd pick from the list
            recipe_id = "test-recipe-123"
            print(f"   ✅ Using recipe ID: {recipe_id}")
            print()
        except Exception as e:
            print(f"   ⚠️  Could not fetch recipes: {e}")
            recipe_id = "test-recipe-123"
            print(f"   Using fallback recipe ID: {recipe_id}")
            print()
        
        # Step 3: Create a cooking session
        print("Step 3: 🍳 Starting cooking session...")
        try:
            session_response = await client.post(
                f"{BASE_URL}/sessions",
                headers=headers,
                json={"recipe_id": recipe_id}
            )
            
            if session_response.status_code == 201:
                session_data = session_response.json()
                session_id = session_data.get("id")
                print(f"   ✅ Session created: {session_id}")
                print(f"   Recipe ID: {session_data.get('recipe_id')}")
                print(f"   Status: {session_data.get('status')}")
                print(f"   Started at: {session_data.get('started_at')}")
                print()
            else:
                print(f"   ❌ Failed to create session: {session_response.status_code}")
                print(f"   Response: {session_response.text}")
                return
        except Exception as e:
            print(f"   ❌ Session creation error: {e}")
            return
        
        # Step 4: Navigate steps (update current step)
        print("Step 4: ⏭️  Navigating through steps...")
        for step_num in [1, 2, 3]:
            try:
                step_response = await client.put(
                    f"{BASE_URL}/sessions/{session_id}/step",
                    headers=headers,
                    json={"current_step_index": str(step_num)}
                )
                
                if step_response.status_code == 200:
                    step_data = step_response.json()
                    print(f"   ✅ Step {step_num}: {step_data.get('message', 'Updated')}")
                else:
                    print(f"   ❌ Step {step_num} failed: {step_response.status_code}")
                    
                await asyncio.sleep(0.5)  # Small delay between steps
            except Exception as e:
                print(f"   ❌ Step {step_num} error: {e}")
        print()
        
        # Step 5: Complete the session
        print("Step 5: ✅ Completing session...")
        try:
            complete_response = await client.put(
                f"{BASE_URL}/sessions/{session_id}",
                headers=headers,
                json={"status": "completed"}
            )
            
            if complete_response.status_code == 200:
                complete_data = complete_response.json()
                print(f"   ✅ Session completed: {complete_data.get('message', 'Success')}")
                print(f"   Final status: {complete_data.get('status', 'N/A')}")
            else:
                print(f"   ❌ Failed to complete session: {complete_response.status_code}")
                print(f"   Response: {complete_response.text}")
        except Exception as e:
            print(f"   ❌ Completion error: {e}")
        print()
        
        print("=" * 60)
        print("🎉 PHASE 2 TEST COMPLETE")
        print("=" * 60)
        print()
        print("Expected backend logs:")
        print("  - POST /api/v1/sessions")
        print("  - PUT /api/v1/sessions/{id}/step (3 times)")
        print("  - PUT /api/v1/sessions/{id}")

if __name__ == "__main__":
    try:
        asyncio.run(test_cooking_session_flow())
    except KeyboardInterrupt:
        print("\n\n⚠️  Test interrupted")
        sys.exit(1)

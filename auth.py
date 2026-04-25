import os
import sqlite3
import requests
import urllib.parse
from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse

router = APIRouter()

SHOPIFY_CLIENT_ID = os.getenv("SHOPIFY_CLIENT_ID", "PASTE_YOUR_CLIENT_ID_HERE")
SHOPIFY_CLIENT_SECRET = os.getenv("SHOPIFY_CLIENT_SECRET", "PASTE_YOUR_SECRET_HERE")
HOST_URL = os.getenv("HOST_URL", "https://PASTE_YOUR_NGROK_URL_HERE.ngrok-free.app")

def init_db():
    conn = sqlite3.connect('shopify_app.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS store_tokens (
            shop TEXT PRIMARY KEY,
            user_id TEXT,
            access_token TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

@router.get("/connect_store")
def connect_store(shop: str):
    if not shop:
        return {"error": "Missing 'shop' parameter. Example: ?shop=rufispartner.myshopify.com"}
    
    query_params = {
        "client_id": SHOPIFY_CLIENT_ID,
        "scope": "read_products,read_orders,read_checkouts",
        "redirect_uri": f"{HOST_URL}/auth/shopify/callback"
    }
    encoded_params = urllib.parse.urlencode(query_params)
    auth_url = f"https://{shop}/admin/oauth/authorize?{encoded_params}"
    
    return RedirectResponse(url=auth_url)

@router.get("/auth/shopify/callback")
async def shopify_callback(request: Request):
    code = request.query_params.get("code")
    shop = request.query_params.get("shop")
    if not code or not shop:
        return {"error": "Missing code or shop parameter from Shopify."}

    token_url = f"https://{shop}/admin/oauth/access_token"
    payload = {
        "client_id": SHOPIFY_CLIENT_ID,
        "client_secret": SHOPIFY_CLIENT_SECRET,
        "code": code
    }
    response = requests.post(token_url, json=payload)
    if response.status_code == 200:
        access_token = response.json().get("access_token")
        user_id = "default_user"
        conn = sqlite3.connect('shopify_app.db')
        cursor = conn.cursor()
        cursor.execute('''
            REPLACE INTO store_tokens (shop, user_id, access_token)
            VALUES (?, ?, ?)
        ''', (shop, user_id, access_token))
        conn.commit()
        conn.close()
        return {
            "status": "success",
            "message": "Store successfully connected and token saved to database!",
            "shop": shop
        }
    else:
        return {"error": "Failed to get access token from Shopify", "details": response.text}

@router.get("/live_products")
def get_live_products(shop: str):
    conn = sqlite3.connect('shopify_app.db')
    cursor = conn.cursor()
    cursor.execute('SELECT access_token FROM store_tokens WHERE shop = ?', (shop,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return {"error": "Store not connected. Please run /connect_store first."}

    access_token = row[0]
    headers = {
        "X-Shopify-Access-Token": access_token,
        "Content-Type": "application/json"
    }
    products_url = f"https://{shop}/admin/api/2024-01/products.json"
    response = requests.get(products_url, headers=headers)
    if response.status_code == 200:
        return {"shop": shop, "live_products": response.json().get("products", [])}
    else:
        return {"error": "Failed to fetch products from Shopify API", "details": response.text}

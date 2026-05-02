from fastapi import APIRouter
from fastapi.responses import RedirectResponse
import requests

router = APIRouter()

CLIENT_ID = "3b407c5dc62a8a04687707e38dc8cc23"
CLIENT_SECRET = "TU_CLIENT_SECRET"  # ⚠️ pon aquí tu client_secret real de Shopify
SCOPES = "read_checkouts,read_orders,read_products"
REDIRECT_URI = "https://shopify-saas-backend-zp36.onrender.com/auth/shopify/callback"

@router.get("/connect_store")
def connect_store(shop: str):
    authorize_url = (
        f"https://{shop}/admin/oauth/authorize"
        f"?client_id={CLIENT_ID}"
        f"&scope={SCOPES}"
        f"&redirect_uri={REDIRECT_URI}"
    )
    return RedirectResponse(authorize_url)

@router.get("/auth/shopify/callback")
def auth_callback(code: str, shop: str):
    token_url = f"https://{shop}/admin/oauth/access_token"
    payload = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "code": code
    }
    response = requests.post(token_url, json=payload)

    if response.status_code == 200:
        access_token = response.json().get("access_token")
        # TODO: guardar en Postgres (shop, access_token, user_id)
        return {"mensaje": "Autorización exitosa", "shop": shop, "access_token": access_token}
    else:
        return {"error": "No se pudo obtener el token", "detalles": response.text}

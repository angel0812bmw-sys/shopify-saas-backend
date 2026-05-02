from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse
from urllib.parse import quote

app = FastAPI(title="Shopify SaaS Backend")

CLIENT_ID = "3b407c5dc62a8a04687707e38dc8cc23"
SCOPES = "read_checkouts,read_orders,read_products"
REDIRECT_URI = "https://shopify-saas-backend-zp36.onrender.com/auth/shopify/callback"

@app.get("/connect_store")
def connect_store(shop: str):
    """Inicia el flujo OAuth con Shopify"""
    if not shop:
        return {"error": "Shop parameter is required"}
    
    # Asegurar que shop tiene el formato correcto
    if not shop.endswith(".myshopify.com"):
        shop = f"{shop}.myshopify.com"
    
    # URL-encode el redirect_uri correctamente
    encoded_redirect_uri = quote(REDIRECT_URI, safe='')
    
    authorize_url = (
        f"https://{shop}/admin/oauth/authorize"
        f"?client_id={CLIENT_ID}"
        f"&scope={SCOPES}"
        f"&redirect_uri={encoded_redirect_uri}"
    )
    
    return RedirectResponse(authorize_url)

@app.get("/auth/shopify/callback")
def shopify_callback(code: str = None, shop: str = None, state: str = None):
    """Callback de Shopify después de autorización"""
    if not code or not shop:
        return {"error": "Missing code or shop parameter"}
    
    # TODO: Aquí intercambiar code por token de acceso
    return {"message": "Authorization successful", "code": code, "shop": shop}

@app.get("/")
def root():
    return {"mensaje": "Backend SaaS Shopify funcionando 🚀"}

# routes/products.py
from fastapi import APIRouter
import requests

router = APIRouter()

@router.get("/products")
def get_products(shop: str, access_token: str):
    url = f"https://{shop}/admin/api/2024-04/products.json"
    headers = {"X-Shopify-Access-Token": access_token}
    response = requests.get(url, headers=headers)
    return response.json()

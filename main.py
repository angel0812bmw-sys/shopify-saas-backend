import os
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from home import router as home_router
from scripts import router as scripts_router
from pricing import router as pricing_router
from auth import router as auth_router, init_db

# Inicializar Base de datos SQLite
init_db()

app = FastAPI(title="Shopify SaaS Backend")

# Registrar routers
app.include_router(home_router, prefix="/home", tags=["Home"])
app.include_router(scripts_router, prefix="/scripts", tags=["Scripts"])
app.include_router(pricing_router, prefix="/pricing", tags=["Pricing"])
app.include_router(auth_router, tags=["Auth"])

@app.get("/")
def root():
    return {"mensaje": "Backend SaaS Shopify funcionando 🚀"}

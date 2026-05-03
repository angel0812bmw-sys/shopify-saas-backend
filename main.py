from fastapi import FastAPI
from routes import auth  # importa el archivo routes/auth.py
from home import router as home_router
from pricing import router as pricing_router
from scripts import router as scripts_router

app = FastAPI(title="Shopify SaaS Backend")

# Registrar los routers
app.include_router(auth.router, tags=["Auth"])
app.include_router(home_router, tags=["Home"])
app.include_router(pricing_router, tags=["Pricing"])
app.include_router(scripts_router, tags=["Scripts"])

@app.get("/")
def root():
    return {"mensaje": "Backend SaaS Shopify funcionando 🚀"}

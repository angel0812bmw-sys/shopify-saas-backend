from fastapi import FastAPI
from routes import auth  # importa el archivo routes/auth.py

app = FastAPI(title="Shopify SaaS Backend")

# Registrar el router de autenticación
app.include_router(auth.router, tags=["Auth"])

@app.get("/")
def root():
    return {"mensaje": "Backend SaaS Shopify funcionando 🚀"}

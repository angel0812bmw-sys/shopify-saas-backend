from fastapi import APIRouter, Depends
from models import User
from logic import consumir_tokens

router = APIRouter()

@router.get("/home_insights")
def home_insights(user: User = Depends()):
    # Simulación de métricas (cuando llegue Shopify, se reemplaza aquí)
    metrics = {
        "ventas_totales": 1200,
        "carritos_abandonados": 45,
        "producto_estrella": "Zapatos deportivos",
        "productos_muertos": ["Camisa azul", "Gorra negra"]
    }

    # Consumo de tokens
    consumir_tokens(user.id, 50)

    return {
        "usuario": {"nombre": user.nombre, "plan": user.plan, "tokens_restantes": user.tokens},
        "resultado": metrics,
        "tokens_restantes": user.tokens,
        "recomendacion": "Mejora el copy de 'Camisa azul' para aumentar ventas."
    }

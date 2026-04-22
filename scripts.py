from fastapi import APIRouter, Depends
from models import User
from logic import consumir_tokens
import openai

router = APIRouter()

@router.post("/generate_script")
def generate_script(producto: str, tono: str, idioma: str, user: User = Depends()):
    # Validar tokens
    if user.tokens < 100:
        return {"error": "No tienes suficientes tokens", "recomendacion": "Cambia de plan o compra más tokens"}

    # Consumo de tokens
    consumir_tokens(user.id, 100)

    # Generación de guion con OpenAI (simulado)
    guion = f"Campaña para {producto} en tono {tono} ({idioma}): 'Descubre la mejor calidad en {producto}, pensado para ti.'"

    return {
        "usuario": {"nombre": user.nombre, "plan": user.plan, "tokens_restantes": user.tokens},
        "resultado": {
            "producto": producto,
            "guion": guion,
            "ideas_imagenes": ["Foto lifestyle", "Imagen minimalista del producto"],
            "proximamente": "Generación de imágenes y videos"
        },
        "tokens_restantes": user.tokens
    }

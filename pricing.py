from fastapi import APIRouter

router = APIRouter()

@router.get("/pricing")
def pricing():
    planes = {
        "Free": {
            "tokens": 500,
            "beneficios": ["Métricas básicas", "1 guion simple", "Radar limitado"]
        },
        "Pro": {
            "tokens": 5000,
            "beneficios": ["Métricas completas", "Guiones avanzados", "Radar conectado", "Copiloto IA"]
        },
        "Premium": {
            "tokens": 10000,
            "beneficios": ["Todo lo anterior", "Soporte prioritario", "Acceso anticipado a imágenes/videos", "Integraciones premium"]
        }
    }
    return {"planes": planes}

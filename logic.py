from models import User

# Simulación de base de datos en memoria
users_db = {
    1: User(id=1, nombre="Miguel", plan="Pro", tokens=5000)
}

def consumir_tokens(user_id: int, cantidad: int):
    user = users_db[user_id]
    if user.tokens >= cantidad:
        user.tokens -= cantidad
    else:
        raise Exception("Tokens insuficientes")
    return user.tokens

def asignar_plan(user_id: int, plan: str):
    user = users_db[user_id]
    planes = {
        "Free": 500,
        "Pro": 5000,
        "Premium": 10000
    }
    user.plan = plan
    user.tokens = planes[plan]
    return user

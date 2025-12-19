from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# def hash_password(password: str) -> str:
#     # Truncate password to 72 characters before hashing
#     password = password[:72]
#     return pwd_context.hash(password)

# def verify_password(password: str, hashed_password: str) -> bool:
#     # Truncate password to 72 characters before verifying
#     password = password[:72]
#     return pwd_context.verify(password, hashed_password)


def hash_password(password: str) -> str:
    if len(password.encode("utf-8")) > 72:
        raise ValueError("Password too long (max 72 bytes allowed)")
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
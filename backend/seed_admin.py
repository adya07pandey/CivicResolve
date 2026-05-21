from app.core.database import SessionLocal

from app.models.user import User
from app.models import user, department, complaint
from app.core.security import hash_password

db = SessionLocal()

existing_admin = db.query(User).filter(
    User.email == "admin@gmail.com"
).first()

if existing_admin:

    print("Admin already exists")

else:

    admin = User(
        name="Adya",
        email="adya23102@iiitnr.edu.in",
        password_hash=hash_password(
            "abcd1234"
        ),
        role="admin"
    )

    db.add(admin)

    db.commit()

    print("Admin created successfully")
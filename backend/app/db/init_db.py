from app.db.base import Base
from app.db.session import engine

# Import models so SQLAlchemy registers them
from app.models.url import URL


def init_db() -> None:
    Base.metadata.create_all(bind=engine)
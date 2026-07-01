import pytest

from fastapi.testclient import TestClient

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.db.base import Base
from app.db.session import get_db

SQLALCHEMY_DATABASE_URL = "sqlite://"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

TestingSessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False,
)


@pytest.fixture(scope="function")
def db():
    Base.metadata.create_all(bind=engine)

    session = TestingSessionLocal()

    yield session

    session.close()
    Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db):

    def override_get_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()
    

@pytest.fixture
def sample_url(
    client,
    auth_headers,
):
    response = client.post(
        "/urls",
        headers=auth_headers,
        json={
            "long_url": "https://google.com",
        },
    )

    return response.json()


def create_and_login_user(
    client: TestClient,
    username: str,
    email: str,
    password: str = "password123",
) -> dict[str, str]:

    client.post(
        "/auth/register",
        json={
            "username": username,
            "email": email,
            "password": password,
        },
    )

    response = client.post(
        "/auth/login",
        json={
            "email": email,
            "password": password,
        },
    )

    token = response.json()["access_token"]

    return {
        "Authorization": f"Bearer {token}",
    }
    
    
@pytest.fixture
def auth_headers(client):
    return create_and_login_user(
        client,
        "sai",
        "sai@example.com",
    )


@pytest.fixture
def second_user_headers(client):
    return create_and_login_user(
        client,
        "alex",
        "alex@example.com",
    )
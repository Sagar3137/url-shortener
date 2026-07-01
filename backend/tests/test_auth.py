from fastapi import status


def test_register_success(client):
    response = client.post(
        "/auth/register",
        json={
            "username": "sai",
            "email": "sai@example.com",
            "password": "password123",
        },
    )

    assert response.status_code == status.HTTP_201_CREATED

    data = response.json()

    assert data["username"] == "sai"
    assert data["email"] == "sai@example.com"
    assert "id" in data
    
    
def test_register_duplicate_email(client):

    payload = {
        "username": "sai",
        "email": "sai@example.com",
        "password": "password123",
    }

    client.post(
        "/auth/register",
        json=payload,
    )

    response = client.post(
        "/auth/register",
        json={
            "username": "another",
            "email": "sai@example.com",
            "password": "password123",
        },
    )

    assert response.status_code == 409
    
    
def test_register_duplicate_username(client):

    payload = {
        "username": "sai",
        "email": "sai@example.com",
        "password": "password123",
    }

    client.post(
        "/auth/register",
        json=payload,
    )

    response = client.post(
        "/auth/register",
        json={
            "username": "sai",
            "email": "another@example.com",
            "password": "password123",
        },
    )

    assert response.status_code == 409
    


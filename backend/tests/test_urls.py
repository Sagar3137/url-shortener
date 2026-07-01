from fastapi import status

def test_create_short_url(client, auth_headers):
    response = client.post(
        "/urls",
        headers=auth_headers,
        json={
            "long_url": "https://google.com",
        },
    )

    assert response.status_code == status.HTTP_201_CREATED

    data = response.json()

    assert data["long_url"] == "https://google.com/"
    assert len(data["short_code"]) == 6
    assert data["short_url"].endswith(data["short_code"])
    assert "created_at" in data
    assert "id" in data
    

def test_get_url_details(client, auth_headers, sample_url):
    response = client.get(
        f"/urls/{sample_url['short_code']}",
        headers=auth_headers,
    )

    assert response.status_code == status.HTTP_200_OK

    data = response.json()

    assert data["short_code"] == sample_url["short_code"]
    assert data["long_url"] == "https://google.com/"
    assert data["clicks"] == 0
    assert data["last_accessed"] is None
    
    
def test_delete_url(client, auth_headers, sample_url):
    response = client.delete(
        f"/urls/{sample_url['short_code']}",
        headers=auth_headers
    )

    assert response.status_code == status.HTTP_204_NO_CONTENT

    response = client.get(
        f"/urls/{sample_url['short_code']}",
        headers=auth_headers
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND
    
    
def test_create_invalid_url(client, auth_headers):
    response = client.post(
        "/urls",
        json={
            "long_url": "not-a-url",
        },
        headers=auth_headers
    )

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    

def test_get_unknown_short_code(client, auth_headers):
    response = client.get("/urls/unknown", headers=auth_headers)

    assert response.status_code == status.HTTP_404_NOT_FOUND
    
    
def test_delete_unknown_short_code(client, auth_headers):
    response = client.delete("/urls/unknown", headers=auth_headers)

    assert response.status_code == status.HTTP_404_NOT_FOUND
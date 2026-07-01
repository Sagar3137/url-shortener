from fastapi import status


def test_empty_url_list(
    client,
    auth_headers,
):
    response = client.get(
        "/urls",
        headers=auth_headers,
    )

    assert response.status_code == status.HTTP_200_OK

    data = response.json()

    assert data["items"] == []
    assert data["total"] == 0
    assert data["page"] == 1
    assert data["page_size"] == 10
    
    
def test_pagination(
    client,
    auth_headers,
):
    for i in range(15):
        client.post(
            "/urls",
            headers=auth_headers,
            json={
                "long_url": f"https://example{i}.com",
            },
        )

    response = client.get(
        "/urls?page=2&page_size=5",
        headers=auth_headers,
    )

    assert response.status_code == status.HTTP_200_OK

    data = response.json()

    assert data["page"] == 2
    assert data["page_size"] == 5
    assert data["total"] == 15
    assert data["total_pages"] == 3
    assert len(data["items"]) == 5
    
    
def test_search(
    client,
    auth_headers,
):
    urls = [
        "https://github.com",
        "https://google.com",
        "https://leetcode.com",
    ]

    for url in urls:
        client.post(
            "/urls",
            headers=auth_headers,
            json={
                "long_url": url,
            },
        )

    response = client.get(
        "/urls?search=git",
        headers=auth_headers,
    )

    assert response.status_code == status.HTTP_200_OK

    data = response.json()

    assert data["total"] == 1
    assert len(data["items"]) == 1
    assert data["items"][0]["long_url"] == "https://github.com/"
    
    
def test_sort_created_at_desc(
    client,
    auth_headers,
):
    for i in range(3):
        client.post(
            "/urls",
            headers=auth_headers,
            json={
                "long_url": f"https://site{i}.com",
            },
        )

    response = client.get(
        "/urls",
        headers=auth_headers,
    )

    data = response.json()

    assert data["items"][0]["long_url"] == "https://site2.com/"
    
    
def test_user_only_sees_their_own_urls(
    client,
    auth_headers,
    second_user_headers,
):
    # User 1 creates 5 URLs
    for i in range(5):
        client.post(
            "/urls",
            headers=auth_headers,
            json={
                "long_url": f"https://user1-{i}.com",
            },
        )

    # User 2 creates 2 URLs
    for i in range(2):
        client.post(
            "/urls",
            headers=second_user_headers,
            json={
                "long_url": f"https://user2-{i}.com",
            },
        )

    response = client.get(
        "/urls",
        headers=auth_headers,
    )

    assert response.status_code == 200
    assert response.json()["total"] == 5

    response = client.get(
        "/urls",
        headers=second_user_headers,
    )

    assert response.status_code == 200
    assert response.json()["total"] == 2
    

def test_invalid_page_number(
    client,
    auth_headers,
):
    response = client.get(
        "/urls?page=0",
        headers=auth_headers,
    )

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    

def test_invalid_page_size(
    client,
    auth_headers,
):
    response = client.get(
        "/urls?page_size=101",
        headers=auth_headers,
    )

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    
    
def test_invalid_sort_field(
    client,
    auth_headers,
):
    response = client.get(
        "/urls?sort_by=banana",
        headers=auth_headers,
    )

    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
from fastapi import status

def test_other_user_cannot_view_url(
    client,
    sample_url,
    second_user_headers,
):
    response = client.get(
        f"/urls/{sample_url['short_code']}",
        headers=second_user_headers,
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN
    

def test_other_user_cannot_delete_url(
    client,
    sample_url,
    second_user_headers,
):
    response = client.delete(
        f"/urls/{sample_url['short_code']}",
        headers=second_user_headers,
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN
    
    
def test_other_user_cannot_update_url(
    client,
    sample_url,
    second_user_headers,
):
    response = client.patch(
        f"/urls/{sample_url['short_code']}",
        headers=second_user_headers,
        json={
            "long_url": "https://evil.com",
        },
    )

    assert response.status_code == status.HTTP_403_FORBIDDEN
    

def test_owner_can_view_url(
    client,
    auth_headers,
    sample_url,
):
    response = client.get(
        f"/urls/{sample_url['short_code']}",
        headers=auth_headers,
    )

    assert response.status_code == status.HTTP_200_OK
    

def test_owner_can_delete_url(
    client,
    auth_headers,
    sample_url,
):
    response = client.delete(
        f"/urls/{sample_url['short_code']}",
        headers=auth_headers,
    )

    assert response.status_code == status.HTTP_204_NO_CONTENT
    
    
def test_owner_can_update_url(
    client,
    auth_headers,
    sample_url,
):
    response = client.patch(
        f"/urls/{sample_url['short_code']}",
        headers=auth_headers,
        json={
            "long_url": "https://github.com",
        },
    )

    assert response.status_code == status.HTTP_200_OK

    data = response.json()

    assert data["long_url"] == "https://github.com/"
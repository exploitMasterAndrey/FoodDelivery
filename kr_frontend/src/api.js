const base_url = `http://${process.env.REACT_APP_SERVER_URL}`

export async function getAllProducts() {
    const response = await fetch(base_url + "/api/v1/products");
    return await response.json();
}

export async function getAllProductsByCategory(category) {
    const response = await fetch(base_url + "/api/v1/products/" + category);
    return await response.json();
}

export async function getProductById(id) {
    const response = await fetch(base_url + "/api/v1/products/single/" + id);
    return await response.json();
}

export async function createProduct(product, jwt) {
    const response = await fetch(base_url + "/api/v1/products/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify(product),
      });
      return await response.json();
}

export async function deleteProduct(id, jwt) {
    const response = await fetch(base_url + "/api/v1/products/delete/" + id, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + jwt
        },
      });
}

export async function updateProduct(product, jwt){
    const response = await fetch(base_url + "/api/v1/products/update", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify(product)
      });
      return await response.json();
}

export async function createOrder(order){
  const response = await fetch(base_url + "/api/v1/orders/create", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order),
  });
  return await response.json();
}

export async function login(name, pass){
  const user = {
    userName: name,
    password: pass
  }

  const response = await fetch(base_url + "/api/v1/auth/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
  });
  return await response.json();
}
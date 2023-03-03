
export const serverJWTRequest = async function (path) {
    try {
        let token = localStorage.getItem('token');
        if (!token) throw new Error('JWT token not found');
        let response = await fetch(process.env.REACT_APP_SERVER_URL+path, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return await response.json()
    } catch (error) {
        console.error(error);
        return null;
    };
}

export const serverGetRequest = async function (path) {
    try {
        let response = await fetch(process.env.REACT_APP_SERVER_URL+path)
        return await response.json()
    } catch (error) {
        console.error(error);
        return null;
    };
}

export const serverPostRequest = async function  (path, data) {
    try {
        let response = await fetch(process.env.REACT_APP_SERVER_URL+path, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        return await response.json()
    } catch (error) {
        console.error(error);
    };
}

export const serverPostAuthRequest = async function  (path, data) {
    try {
        let token = localStorage.getItem('token');
        if (!token) throw new Error('JWT token not found');
        let response = await fetch(process.env.REACT_APP_SERVER_URL+path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        return await response.json()
    } catch (error) {
        console.error(error);
    };
}


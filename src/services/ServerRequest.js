
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
        console.log('Error:'+error.message);
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
        console.log('Error:'+error.message);
    };
}



async function serverRequest () {
    try {
        let response = await fetch(process.env.REACT_APP_SERVER_URL)
        return await response.json()
    } catch (error) {
        console.log('Error:'+error.message);
    };
}

export default serverRequest;
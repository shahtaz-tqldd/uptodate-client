export const addToDB = (dbUserInfo) => {
    fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dbUserInfo)
    })
        .then(res => res.json())
        .then(() => {})
}
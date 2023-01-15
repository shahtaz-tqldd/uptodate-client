export const addToDB = (dbUserInfo) => {
    fetch('https://dev-blog-server.vercel.app/users', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dbUserInfo)
    })
        .then(res => res.json())
        .then(() => {})
}
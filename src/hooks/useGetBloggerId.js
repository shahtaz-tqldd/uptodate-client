import { useEffect, useState } from "react"

const useGetBloggerId = (email) => {
    const [bloggerId, setBloggerId] = useState(false)
    const [bloggerIdLoading, setBloggerIdLoading] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`https://dev-blog-server.vercel.app/users/${email}`)
                .then(res => res.json())
                .then(data => {
                    setBloggerId(data.bloggerId)
                    setBloggerIdLoading(false)
                })
        }
    }, [email])
    return [bloggerId, bloggerIdLoading]
}

export default useGetBloggerId
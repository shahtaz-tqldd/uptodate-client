import { useEffect, useState } from "react"

const useBlogger = (email) => {
    const [isBlogger, setIsBlogger] = useState(false)
    const [isBloggerLoading, setIsBloggerLoading] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`https://dev-blog-server.vercel.app/users/blogger/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsBlogger(data.isBlogger)
                    setIsBloggerLoading(false)
                })
        }
    }, [email])
    return [isBlogger, isBloggerLoading]
}

export default useBlogger
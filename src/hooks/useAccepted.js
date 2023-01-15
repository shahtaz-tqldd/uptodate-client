import { useEffect, useState } from "react"

const useAccepted = (email) => {
    const [accepted, setAccepted] = useState(false)
    const [acceptedLoading, setAcceptedLoading] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`https://dev-blog-server.vercel.app/users/blogger/accepted/${email}`)
                .then(res => res.json())
                .then(data => {
                    setAccepted(data.isAccepted)
                    setAcceptedLoading(false)
                })
        }
    }, [email])
    return [accepted, acceptedLoading]
}

export default useAccepted
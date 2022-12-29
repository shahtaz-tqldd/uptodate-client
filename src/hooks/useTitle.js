import { useEffect } from "react"

const useTitle = (title) => {
    useEffect(() => {
        document.title = `Dev Blog- ${title}`
        window.scrollTo({ top: 0 })
    }, [title])
}

export default useTitle
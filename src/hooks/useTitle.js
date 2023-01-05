import { useEffect } from "react"

const useTitle = (title) => {
    useEffect(() => {
        document.title = `Uptodate Blog- ${title}`
        window.scrollTo({ top: 0 })
    }, [title])
}

export default useTitle
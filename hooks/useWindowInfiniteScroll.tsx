import { useEffect } from 'react'

interface Props {
  loadMoreFunc: Function
  data: any[]
  stopLoadingData: boolean
}

export default function useWindowInfiniteScroll({
  loadMoreFunc,
  data,
  stopLoadingData
}: Props) {
  useEffect(() => {
    if (stopLoadingData) {
      return
    }

    function scrollEvent() {

      if (
        window.scrollY ===
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight
      ) {
        loadMoreFunc()
      }
    }

    window.addEventListener('scroll', scrollEvent)

    return () => window.removeEventListener('scroll', scrollEvent)
  }, [data])
}

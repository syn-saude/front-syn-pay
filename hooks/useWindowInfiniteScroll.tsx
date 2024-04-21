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
      //   console.log(
      //     'scroll',
      //     window.scrollY,
      //     document.documentElement.scrollHeight -
      //       document.documentElement.clientHeight,
      //     document.documentElement.scrollHeight,
      //     screenSize
      //   )
      if (
        window.scrollY ===
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight
      ) {
        console.log('ativou evento')
        loadMoreFunc()
      }
    }

    window.addEventListener('scroll', scrollEvent)

    return () => window.removeEventListener('scroll', scrollEvent)
  }, [data])
}

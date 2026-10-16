
import { useEffect, useState } from 'react'

const useMyList = () => {
  const [myList, setMyList] = useState(() => {
    try {
      const savedList = localStorage.getItem('ai-cinema-my-list')
      return savedList ? JSON.parse(savedList) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(
      'ai-cinema-my-list',
      JSON.stringify(myList)
    )
  }, [myList])

  return {
    myList,
    setMyList,
  }
}

export default useMyList

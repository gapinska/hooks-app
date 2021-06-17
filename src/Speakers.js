import React, { useState, useEffect } from "react"
import SpeakerData from "./SpeakerData"
import Speaker from "./Speaker"

export default function Speakers() {
  const [speakerList, setSpeakerList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setSpeakerList(SpeakerData)
    setIsLoading(false)
  }, [])

  console.log(speakerList)

  const heartFavoriteHandler = (e, favoriteValue, id) => {
    e.preventDefault()
    setSpeakerList(
      speakerList.map((item) => {
        if (item.id === id) {
          return { ...item, favorite: favoriteValue }
        } else return item
      })
    )
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {speakerList.map(({ id, firstName, lastName, favorite, bio }) => (
        <Speaker
          key={id}
          id={id}
          favorite={favorite}
          firstName={firstName}
          lastName={lastName}
          bio={bio}
          onHeartFavoriteHandler={heartFavoriteHandler}
        />
      ))}
    </div>
  )
}

import React, { useState, useEffect } from "react"
import SpeakerData from "./SpeakerData"
import Speaker from "./Speaker"

export default function Speakers() {
  const [speakerList, setSpeakerList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [speakingSaturday, setSpeakingSaturday] = useState(true)
  const [speakingSunday, setSpeakingSunday] = useState(true)

  useEffect(() => {
    setSpeakerList(SpeakerData)
    setIsLoading(false)
  }, [])

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

  const handleChangeSaturday = () => {
    setSpeakingSaturday(!speakingSaturday)
  }
  const handleChangeSunday = () => {
    setSpeakingSunday(!speakingSunday)
  }

  const speakerListFiltered = isLoading
    ? []
    : speakerList.filter(
        ({ sat, sun }) => (speakingSaturday && sat) || (speakingSunday && sun)
      )

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <div className="container">
        <div>
          <label>
            <input
              type="checkbox"
              className="check-input"
              onChange={handleChangeSaturday}
              checked={speakingSaturday}
            />{" "}
            Saturday Speaker
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              className="check-input"
              onChange={handleChangeSunday}
              checked={speakingSunday}
            />
          </label>
          Sunday Speaker
        </div>
      </div>
      {speakerListFiltered.map(
        ({ id, firstName, lastName, favorite, bio, sat, sun }) => (
          <Speaker
            key={id}
            id={id}
            favorite={favorite}
            firstName={firstName}
            lastName={lastName}
            bio={bio}
            sat={sat}
            sun={sun}
            onHeartFavoriteHandler={heartFavoriteHandler}
          />
        )
      )}
    </div>
  )
}

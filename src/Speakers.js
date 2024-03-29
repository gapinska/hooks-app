import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react"
import SpeakerData from "./SpeakerData"
import Speaker from "./Speaker"
import { ConfigContext } from "./App"
import speakersReducer from "./speakersReducer"

export default function Speakers() {
  //   const [speakerList, setSpeakerList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [speakingSaturday, setSpeakingSaturday] = useState(true)
  const [speakingSunday, setSpeakingSunday] = useState(true)

  const [speakerList, dispatch] = useReducer(speakersReducer, [])
  //   const [state, dispatch] = useReducer(reducer, initialState);

  const context = useContext(ConfigContext)

  useEffect(() => {
    // setSpeakerList(SpeakerData)
    dispatch({ type: "setSpeakerList", payload: SpeakerData })
    setIsLoading(false)
  }, [])

  const heartFavoriteHandler = useCallback((e, favoriteValue, id) => {
    e.preventDefault()
    // const filteredSpeakerList = speakerList.map((item) => {
    //   if (item.id === id) {
    //     return { ...item, favorite: favoriteValue }
    //   } else return item
    // })
    // dispatch({ type: "setSpeakerList", payload: filteredSpeakerList })

    dispatch({
      type: favoriteValue === true ? "favorite" : "unfavorite",
      payload: id,
    })
  }, [])

  const handleChangeSaturday = () => {
    setSpeakingSaturday(!speakingSaturday)
  }
  const handleChangeSunday = () => {
    setSpeakingSunday(!speakingSunday)
  }
  const newSpeakersList = useMemo(
    () =>
      speakerList.filter(
        ({ sat, sun }) => (speakingSaturday && sat) || (speakingSunday && sun)
      ),
    [speakerList, speakingSaturday, speakingSunday]
  )

  const speakerListFiltered = isLoading ? [] : newSpeakersList
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {context.showSpeakerSpeakingDays === false ? null : (
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
      )}

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

import React, { useState } from "react"
import ImageToggleOnScroll from "./ImageToggleOnScroll"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import FavoriteIcon from "@material-ui/icons/Favorite"

export default function Speaker({
  id,
  favorite,
  firstName,
  lastName,
  bio,
  sat,
  sun,
  onHeartFavoriteHandler,
}) {
  return (
    <div>
      <ImageToggleOnScroll
        primaryImg={`/static/speakers/bw/Speaker-${id}.jpg`}
        secondaryImg={`/static/speakers/Speaker-${id}.jpg`}
        alt={`${firstName} ${lastName}`}
      />
      <div>
        {firstName} {lastName}
      </div>
      <div onClick={(e) => onHeartFavoriteHandler(e, !favorite, id)}>
        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </div>
    </div>
  )
}

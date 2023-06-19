import React, { useEffect, useState } from "react"
import axios from "axios"
import { Grid, Box, CircularProgress } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Grid as SwiperGrid } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/grid"

import PlaylistCard from "./PlaylistCard"
import { SERVER_URL } from "../../api/requests"

function PlaylistsRow({ country, currentGenre, handleCardClick, chosenCard }) {
  const [playlists, setPlaylists] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const url = `${SERVER_URL}/api/playlists?id=${currentGenre}&country=${country}`
  useEffect(() => {
    async function getTrendingPlaylists() {
      try {
        const response = await axios.get(url)
        setPlaylists(response.data.data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }
    getTrendingPlaylists()
  }, [url])

  return (
    <Grid item xs={12}>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation
        grid={{ rows: 3, fill: "row" }}
        breakpoints={{
          0: { slidesPerView: 2, grid: { rows: 3, fill: "row" } },
          300: { slidesPerView: 2, grid: { rows: 3, fill: "row" } },
          600: { slidesPerView: 4, grid: { rows: 3, fill: "row" } },
          900: { slidesPerView: 5, grid: { rows: 3, fill: "row" } },
          1200: { slidesPerView: 6, grid: { rows: 3, fill: "row" } },
        }}
        modules={[Pagination, Navigation, SwiperGrid]}
        className="mySwiper"
      >
        {playlists.map((playlist, index) => (
          <SwiperSlide
            style={{ background: "none", width: "150px" }}
            key={index}
          >
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignSelf: "flex-start",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <PlaylistCard
                id={playlist.id}
                image={playlist.image}
                name={playlist.name}
                handleCardClick={handleCardClick}
                chosenCard={chosenCard}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  )
}

export default PlaylistsRow

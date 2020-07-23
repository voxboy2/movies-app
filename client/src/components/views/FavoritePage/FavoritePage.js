import React, { useEffect,useState } from 'react'
import './favorite.css'
import Axios from 'axios'
import { Popover } from 'antd'
import { IMAGE_URL } from '../../Config'
import MovieDetailPage from '../MovieDetailPage/MovieDetailPage'
import FlashMessage from 'react-flash-message'

export default function FavoritePage() {

    const variables = { userFrom: localStorage.getItem('userId') }

    const [FavoritedMovies, setFavoritedMovies] = useState([])

    const [ShowMessage, setShowMessage] = useState([false])

    useEffect(() => {
       fetchFavoritedMovies();
    }, [])

    const fetchFavoritedMovies = () => {
        Axios.post('/api/favorite/getFavoriteMovie', variables)
        .then(response => {
            if(response.data.success) {
             setFavoritedMovies(response.data.favorites)
            } else {
                alert('failed to get favorite videos')
            }
        })
    }
    


    const onClickRemove = (movieId) => {
        const variable = {
            movieId: movieId,
            userFrom: localStorage.getItem('userId')
        }

        Axios.post('/api/favorite/removeFromFavorite', variable)
        .then(response => {
            if(response.data.success) {
                fetchFavoritedMovies();
            } else {
                alert('failed to get favorite videos')
            }
        })
    }

    const renderTableBody = FavoritedMovies.map((movie,index) => {

        const content = (
            <div>
                {movie.moviePost ?
                <img src={`${IMAGE_URL}w500${movie.moviePost}`} alt="moviePost"/>
                :
                "NO IMAGE"
                }

            </div>
        )
        return <tr>
            <Popover content={content} title={`${movie.movieTitle}`}>

              <td>{movie.movieTitle}</td>

            </Popover>
            <td>{movie.movieRunTime} mins</td>
            <td><button onClick={()=>onClickRemove(movie.movieId)}>Remove from favorites</button></td>

        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <h3>Favorite Movies By Me</h3>

            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Remove from favorites</th>

                    </tr>
                </thead>
            

                <tbody>
                   {renderTableBody}
                </tbody>



            </table>
        </div>
    )
}

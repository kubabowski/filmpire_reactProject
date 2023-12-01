import React, { useState } from 'react';
import { Typography, Grid, Box, CircularProgress, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { useGetActorQuery, useGetMoviesbyActorQuery } from '../../services/TMDB';
import { MovieList, Movielist } from '..';

const Actors = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorQuery({ actor_id: id });
  const history = useNavigate();
  const classes = useStyles();
  const page = 1;
  const { data: movies } = useGetMoviesbyActorQuery({ id, page });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={ArrowBack} onClick={() => history(-1)} color="primary">
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            alt={data.name}
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
          />
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>{ data.name }</Typography>
          <Typography variant="h5" gutterBottom>Born: {new Date(data?.birthday).toDateString() }</Typography>
          <Typography variant="body1" align="justify" paragraph>{data?.biography || 'Sorry, no biography'}</Typography>

          <Box marginBottom="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
            {/* <Button color="primary" startIcon={ArrowBack} onClick={() => history(-1)}>Go Back</Button> */}
            <Button onClick={() => history(-1)}>Go Back</Button>

          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">Movies</Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
      </Box>
    </>
  );
};

export default Actors;

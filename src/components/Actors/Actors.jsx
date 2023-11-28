import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { useGetGetActorQuery } from '../../services/TMDB';

const Actors = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetGetActorQuery({ actor_id: id });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  console.log(data);
  return (
    <div>
      Actors - { id }
      {/* {data} */}
    </div>
  );
};

export default Actors;

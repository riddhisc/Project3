import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../features/jobsSlice';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, isLoading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} key={job._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {job.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {job.company}
                </Typography>
                <Typography variant="body2" paragraph>
                  {job.description}
                </Typography>
                <Button variant="contained" color="primary">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Jobs;
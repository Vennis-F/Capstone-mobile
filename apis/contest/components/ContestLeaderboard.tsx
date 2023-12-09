import { Box, Container, Paper, Grid, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import Image from 'material-ui-image'
import React from 'react'

const ContestLeaderboard = () => {
  console.log(123)
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
        <Typography
          style={{ fontWeight: 'bold', fontSize: 25, justifyContent: 'center', display: 'flex' }}
        >
          LeaderBoard
        </Typography>
        <Stack spacing={2} sx={{ marginTop: 3 }}>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <Box
                sx={{
                  width: '40%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '100px',
                  border: '2px solid #ccc',
                  marginLeft: 10,
                  paddingBottom: 1,
                  paddingTop: 1,
                }}
              >
                <Typography style={{ fontWeight: 'bold', fontSize: 30 }}>1</Typography>
                <Image
                  src={
                    'https://fineartamerica.com/images/contestlogos/logo1-beautiful-paris-city-of-lights-at-sunset-or-night.jpg'
                  }
                  style={{ height: '50px', width: '50px', padding: 0 }}
                  imageStyle={{ height: '50px', width: '50px', borderRadius: 40, marginLeft: 15 }}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ color: '#333' }}>
                <Typography style={{ fontWeight: 'bold', fontSize: 15 }}>
                  Nguyễn Hoàng Lộc
                </Typography>
                <Typography style={{ fontSize: 15 }}>600 lượt thích</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Image
                src={
                  'https://fineartamerica.com/images/contestlogos/logo1-your-personal-masterpiece-digital-art-or-photography.jpg'
                }
                style={{ height: '70px', width: '120px', padding: 0 }}
                imageStyle={{ height: '70px', width: '120px', borderRadius: 10 }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <Box
                sx={{
                  width: '40%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '100px',
                  border: '2px solid #ccc',
                  marginLeft: 10,
                  paddingBottom: 1,
                  paddingTop: 1,
                }}
              >
                <Typography style={{ fontWeight: 'bold', fontSize: 30 }}>2</Typography>
                <Image
                  src={
                    'https://fineartamerica.com/images/contestlogos/logo1-beautiful-paris-city-of-lights-at-sunset-or-night.jpg'
                  }
                  style={{ height: '50px', width: '50px', padding: 0 }}
                  imageStyle={{ height: '50px', width: '50px', borderRadius: 40, marginLeft: 15 }}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ color: '#333' }}>
                <Typography style={{ fontWeight: 'bold', fontSize: 15 }}>
                  Nguyễn Hoàng Lộc
                </Typography>
                <Typography style={{ fontSize: 15 }}>600 lượt thích</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Image
                src={
                  'https://fineartamerica.com/images/contestlogos/logo1-your-personal-masterpiece-digital-art-or-photography.jpg'
                }
                style={{ height: '70px', width: '120px', padding: 0 }}
                imageStyle={{ height: '70px', width: '120px', borderRadius: 10 }}
              />
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </Container>
  )
}
export default ContestLeaderboard

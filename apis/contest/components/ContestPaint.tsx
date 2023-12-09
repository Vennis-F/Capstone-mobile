/* eslint-disable */
import { Grid, Typography } from '@material-ui/core'
import { Box, Container } from '@mui/material'
import { getCustomerDrawingsByContest } from 'features/customer-drawing/api'
import { CustomerDrawing, CustomerDrawingSortField } from 'features/customer-drawing/types'
import Image from 'material-ui-image'
import React, { useEffect, useState } from 'react'
import { OrderType } from 'types'
import { Contest } from '../types'
import { getImage } from 'features/image/components/apis'

type Props = {
  contest: Contest
}

const ContestPaint = ({ contest }: Props) => {
  const [customerDrawings, setCustomerDrawings] = useState<CustomerDrawing[]>([])

  const fetchCustomerDrawings = async () => {
    try {
      const res = await getCustomerDrawingsByContest(contest.id, {
        customerDrawingSortField: CustomerDrawingSortField.VOTE,
        pageOptions: {
          order: OrderType.DESC,
          page: 1,
          take: 1000,
        },
      })
      setCustomerDrawings(res.data)
    } catch (error) {
      console.error('Error fetching customer drawings:', error)
    }
  }

  useEffect(() => {
    fetchCustomerDrawings()
  }, [contest.id])

  return (
    <Container maxWidth="lg" style={{ backgroundColor: '#fff', paddingTop: 10 }}>
      <Grid container spacing={5}>
        {customerDrawings.map(customerDrawing => (
          <Grid item xs={3}>
            <Image
              src={getImage(customerDrawing.imageUrl)}
              style={{ height: '220px', width: '250px', padding: 0 }}
              imageStyle={{ height: '220px', width: '250px' }}
            />
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <Typography style={{ fontSize: 14, fontWeight: 'bold', color: 'inherit' }}>
                {customerDrawing.title}
              </Typography>
              <Typography style={{ color: '#666666', fontSize: 12 }}>
                {customerDrawing.customerName}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
export default ContestPaint

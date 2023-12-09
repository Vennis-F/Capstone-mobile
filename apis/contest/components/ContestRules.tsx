import AddIcon from '@mui/icons-material/Add'
import { Box, Container, Paper, Grid, Typography } from '@mui/material'
import Image from 'material-ui-image'
import { useEffect, useState } from 'react'

import { createCustomerDrawing, updateCustomerDrawingImage } from 'features/customer-drawing/api'
import CreateCustomerDrawingDialogForm from 'features/customer-drawing/components/CreateCustomerDrawingDialogForm'
import { getImage } from 'features/image/components/apis'
import CustomButton from 'libs/ui/components/CustomButton'
import { getStringMinuteHourDayMonthYear } from 'libs/utils/handle-date'
import { renderHTML } from 'libs/utils/handle-html-data'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess, toastWarn } from 'libs/utils/handle-toast'
import { getUserRole } from 'libs/utils/handle-token'

import { Contest, ContestStatus } from '../types'

type Props = {
  contest: Contest
}

const ContestRules = ({ contest }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState<string>(`0`)

  const handleJoinContest = async () => {
    const userRole = getUserRole()
    if (!userRole) return toastWarn({ message: 'Hãy đăng nhập trước khi tham gia cuộc thi' })

    setOpen(true)
    return null
  }

  useEffect(() => {
    const endDate = new Date(contest.expiredDate).getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endDate - now

      if (distance <= 0) {
        clearInterval(timer)
        setTimeLeft(`0`)
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        // Hiển thị thời gian còn lại dưới dạng chuỗi
        setTimeLeft(`${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`)
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      <Box width="100%" textAlign="right" marginY="20px">
        <div>
          <h2>Thời gian còn lại cho cuộc thi:</h2>
          <p>{timeLeft}</p>
        </div>
        <CustomButton
          onClick={handleJoinContest}
          sxCustom={{ width: '220px' }}
          disable={contest.status !== ContestStatus.ACTIVE}
        >
          <AddIcon /> Tham gia cuộc thi
        </CustomButton>
      </Box>

      <Container
        maxWidth="lg"
        style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}
      >
        <Typography style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: 30 }}>
          THỂ LỆ CUỘC THI
        </Typography>
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#e56b87' }}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Image
                src={getImage(contest.thumbnailUrl)}
                style={{ height: '200px', width: '270px', padding: 0, marginLeft: 30 }}
                imageStyle={{ height: '200px', width: '270px', borderRadius: 3 }}
              />
            </Grid>
            <Grid item xs={6} style={{ marginLeft: '-20px', color: '#fff' }}>
              <Typography>
                1. Bạn chỉ cần có tài khoản và đăng nhập vào trang web vecungtreem.online là có thể
                tham gia cuộc thi.
              </Typography>
              <Typography>2. Vẽ đúng đề tài mà cuộc thi đã cho.</Typography>
              <Typography>
                3. Không sử dụng tác phẩm của người khác để tham gia cuộc thi.
              </Typography>
              <Typography>
                4. Mỗi người tham gia cuộc thi chỉ có thế nộp 1 tác phẩm dự thi.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Typography style={{ fontWeight: 'bold', marginBottom: 20, marginTop: 40, fontSize: 30 }}>
          MIÊU TẢ
        </Typography>
        <Paper elevation={3} style={{ padding: 20, backgroundColor: '#ff8c94', color: '#fff' }}>
          {renderHTML(contest.description)}
        </Paper>
        <Typography style={{ fontWeight: 'bold', marginBottom: 20, marginTop: 40, fontSize: 30 }}>
          THỂ LỆ NỘP BÀI
        </Typography>
        <Paper elevation={3} style={{ padding: 20, backgroundColor: '#ff8c94', color: '#fff' }}>
          <Typography>
            Mỗi người tham gia có thể gửi 1 bài dự thi, và sẽ đợi hội đồng xét duyệt bài thi đó.
          </Typography>
        </Paper>
        <Typography style={{ fontWeight: 'bold', marginBottom: 20, marginTop: 40, fontSize: 30 }}>
          THỂ LỆ BÌNH CHỌN
        </Typography>
        <Paper elevation={3} style={{ padding: 20, backgroundColor: '#f08080', color: '#fff' }}>
          <Typography>
            1.Bạn phải tham gia cuộc thi thì mới được bình chọn bài mình thích.
          </Typography>
          <Typography>
            2.Mỗi người chỉ có một lượt bình chọn và không được bình chọn cho chính bài thi của
            mình.
          </Typography>
        </Paper>
        <Typography style={{ fontWeight: 'bold', marginBottom: 20, marginTop: 40, fontSize: 30 }}>
          THỜI GIAN CUỘC THI
        </Typography>
        <Paper elevation={3} style={{ padding: 20, backgroundColor: '#9370db', color: '#fff' }}>
          <Grid container spacing={0} style={{ marginBottom: 10 }}>
            <Grid item xs={3}>
              <Typography>Bắt đầu cuộc thi :</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ marginLeft: -50 }}>
                {getStringMinuteHourDayMonthYear(contest.startedDate)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={0} style={{ marginBottom: 10 }}>
            <Grid item xs={3}>
              <Typography>Kết thúc cuộc thi :</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ marginLeft: -50 }}>
                {getStringMinuteHourDayMonthYear(contest.expiredDate)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={0} style={{ marginBottom: 10 }}>
            <Grid item xs={3}>
              <Typography>Trao giải thưởng :</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ marginLeft: -50 }}>
                11 giờ sáng Thứ tư, ngày 13 tháng 12 năm 2023
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Typography style={{ fontWeight: 'bold', marginBottom: 20, marginTop: 40, fontSize: 30 }}>
          GIẢI THƯỞNG
        </Typography>
        <Paper elevation={3} style={{ padding: 20, backgroundColor: '#9370db', color: '#fff' }}>
          {renderHTML(contest.prize)}
        </Paper>
      </Container>

      <CreateCustomerDrawingDialogForm
        defaultValues={{
          description: '',
          title: '',
        }}
        handleCloseDialog={() => setOpen(false)}
        isLoading={loading}
        onSubmitClick={async (data, file, reset) => {
          setLoading(true)
          try {
            const customerDrawing = await createCustomerDrawing(contest.id, {
              title: data.title,
              description: data.description,
            })

            const formData = new FormData()
            formData.append('file', file)
            await updateCustomerDrawingImage(customerDrawing.id, formData)

            toastSuccess({ message: 'Bạn đã tạo bài thi thành công!!!' })
            setOpen(false)
            reset()
          } catch (error) {
            showErrorResponseSaga({ defaultMessage: 'Đăng tải bài vẽ không thành công', error })
          }
          setLoading(false)
        }}
        openDialog={open}
        // otherValues={}
      />
    </>
  )
}
export default ContestRules

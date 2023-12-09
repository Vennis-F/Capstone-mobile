import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, CircularProgress, Dialog, DialogTitle, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import React from 'react'
import { UseFormReset, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { MainColor } from 'libs/const/color'
import FormDateField from 'libs/ui/form-components/FormDateField'
import FormReactQuillField from 'libs/ui/form-components/FormReactQuillField'
import { FormTextField } from 'libs/ui/form-components/FormTextField'
import { textFromHTMLCode } from 'libs/utils/handle-html-data'
import { toastWarn } from 'libs/utils/handle-toast'

import { CreateContestFormInput } from '../types/form.type'

export type Props = {
  defaultValues?: CreateContestFormInput
  onSubmitClick(data: CreateContestFormInput, reset: UseFormReset<CreateContestFormInput>): void
  openDialog: boolean
  handleOpenDialog: () => void
  handleCloseDialog: () => void
  isLoading: boolean
  // otherValues: { url?: string; postId: string }
}

const CreateContestDialogForm = (props: Props) => {
  const { defaultValues, onSubmitClick } = props

  const newValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Không được để trống tiêu đề')
      .max(100, 'Tiêu đề không được quá 100 ký tự'),
    // description: Yup.string().required('Không được để trống miêu tả'),
    // prize: Yup.string().required('Không được để trống giải thưởng'),
    startedDate: Yup.string().required('Không được để trống ngày bắt đầu'),
    expiredDate: Yup.string().required('Không được để trống ngày kết thúc'),
  })

  const methods = useForm<CreateContestFormInput>({
    defaultValues,
    resolver: yupResolver(newValidationSchema),
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty, dirtyFields }, // tự nhiêm làm bước này xong thì lại thành công vcl
  } = methods

  const submitHandler = (data: CreateContestFormInput) => {
    console.log(123)
    console.log('[submit]', isDirty, dirtyFields, data, textFromHTMLCode(data.description).length)
    if (
      !isDirty ||
      textFromHTMLCode(data.description).length === 0 ||
      textFromHTMLCode(data.prize).length === 0
    ) {
      toastWarn({
        message: 'Điền đầy đủ thông tin trước khi khởi tạo!',
      })
    } else {
      onSubmitClick(data, reset)
    }
  }
  console.log('[defaultValues]', defaultValues)

  return (
    <Dialog
      open={props.openDialog}
      onClose={props.handleCloseDialog}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: '600', fontSize: '30px' }}>
        Tạo cuộc thi
      </DialogTitle>
      <Stack sx={{ padding: '20px' }} direction="column" spacing={1} justifyContent="center">
        <Box sx={{ height: '60px', marginBottom: '25px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Tiêu đề
          </Typography>
          <FormTextField name="title" control={control} size="small" />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Miêu tả
          </Typography>
          <FormReactQuillField
            isFull={true}
            name="description"
            label={'Miêu tả'}
            control={control}
          />
        </Box>
        <Box sx={{ height: '60px' }} />
        <Box>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Giải thưởng
          </Typography>
          <FormReactQuillField isFull={true} name="prize" label={'Giải thưởng'} control={control} />
        </Box>
        <Box sx={{ height: '60px' }} />
        <Box sx={{ height: '90px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Ngày bắt đầu
          </Typography>
          <FormDateField name="startedDate" control={control} />
        </Box>
        <Box sx={{ height: '90px' }}>
          <Typography variant="h6" fontWeight="bold" fontSize="18px">
            Ngày kết thúc
          </Typography>
          <FormDateField name="expiredDate" control={control} />
        </Box>
        <Box sx={{ height: '20px' }} />
        <Button
          onClick={handleSubmit(submitHandler)}
          variant={'contained'}
          size="large"
          sx={{
            width: '140px',
            backgroundColor: MainColor.RED_500,
            fontWeight: '600',
            '&:hover': {
              backgroundColor: MainColor.RED_600,
            },
          }}
          disabled={props.isLoading}
        >
          {!props.isLoading ? 'Tạo mới' : <CircularProgress size="26px" />}
        </Button>
      </Stack>
    </Dialog>
  )
}

export default CreateContestDialogForm

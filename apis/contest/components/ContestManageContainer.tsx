/* eslint-disable @typescript-eslint/no-unused-vars */
import AddIcon from '@mui/icons-material/Add'
import { Box, Container, Dialog, DialogContent, DialogTitle, Paper } from '@mui/material'
import { useEffect, useState } from 'react'

import LayoutBodyContainer from 'components/Layout/LayoutBodyContainer'
import TableCustomerDrawings from 'features/customer-drawing/components/TableCustomerDrawings'
import CustomButton from 'libs/ui/components/CustomButton'
import TitleTypography from 'libs/ui/components/TitleTypography'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'
import { OrderType, PageOptions } from 'types'

import { createContestByStaff, getContestsByStaff } from '../api'
import { Contest } from '../types'

import CreateContestDialogForm from './CreateContestDialogForm'
import EditContestDialogForm from './EditContestDialogForm'
import TableContests from './TableContests'

const ContestManageContainer = () => {
  const [contests, setContests] = useState<Contest[]>([])
  const [currentContest, setCurrentContest] = useState<Contest | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)
  const [isOpenFormCreate, setIsOpenFormCreate] = useState(false)
  const [currentContestNeedApprove, setCurrentContestNeedApprove] = useState<string | null>(null)

  const fetchContests = async () => {
    try {
      const fetchedContests = await getContestsByStaff()
      setContests(fetchedContests)
    } catch (error) {
      console.error('Error fetching Contests:', error)
    }
  }

  useEffect(() => {
    fetchContests()
  }, [])

  console.log(currentContest)

  return (
    <Container maxWidth="xl">
      <LayoutBodyContainer title="Cuộc thi" introduction="">
        <Box width="100%" textAlign="right" marginBottom="20px">
          <CustomButton
            onClick={() => {
              setIsOpenFormCreate(true)
            }}
            sxCustom={{
              width: '200px',
              textTransform: 'capitalize',
              padding: '10px 0px',
            }}
          >
            <AddIcon /> Tạo cuộc thi mới
          </CustomButton>
        </Box>

        <TableContests
          contests={contests}
          onEditRow={contestId => {
            const currContest = contests.find(contest => contest.id === contestId) as Contest
            setCurrentContest(currContest)
            setIsOpenForm(true)
          }}
          onApproveContest={contestId => setCurrentContestNeedApprove(contestId)}
        />
      </LayoutBodyContainer>

      {currentContest && (
        <EditContestDialogForm
          defaultValues={{
            title: currentContest.title,
            prize: currentContest.prize,
            // active: currentContest.active,
            description: currentContest.description,
            startedDate: currentContest.startedDate,
            expiredDate: currentContest.expiredDate,
          }}
          otherValues={{
            url: currentContest.thumbnailUrl,
            contestId: currentContest.id,
          }}
          onSubmitClick={async data => {
            // setIsLoading(true)
            // try {
            //   await updateContestByStaff({
            //     ContestId: currentContest.id,
            //     active: data.active,
            //     description: data.description,
            //     resources: data.resources,
            //     title: data.title,
            //   })
            //   fetchContests()
            //   setCurrentContest(null)
            //   setIsOpenForm(false)
            //   toastSuccess({ message: 'Cập nhật bài đăng thành công' })
            // } catch (error) {
            //   showErrorResponseSaga({ defaultMessage: 'Không thể cập nhật bài đăng', error })
            // }
            // setIsLoading(false)
          }}
          openDialog={isOpenForm}
          isLoading={isLoading}
          handleOpenDialog={() => setIsOpenForm(true)}
          handleCloseDialog={() => setIsOpenForm(false)}
        />
      )}

      <CreateContestDialogForm
        defaultValues={{
          title: '',
          description: '',
          prize: '',
          startedDate: '',
          expiredDate: '',
        }}
        onSubmitClick={async (data, reset) => {
          setIsLoadingCreate(true)
          try {
            await createContestByStaff({
              title: data.title,
              description: data.description,
              prize: data.prize,
              startedDate: data.startedDate,
              expiredDate: data.expiredDate,
            })
            reset()
            fetchContests()
            setIsOpenFormCreate(false)
            toastSuccess({ message: 'Tạo bài đăng mới thành công' })
          } catch (error) {
            showErrorResponseSaga({ defaultMessage: 'Không thể tạo bài đăng mới', error })
          }
          setIsLoadingCreate(false)
        }}
        openDialog={isOpenFormCreate}
        isLoading={isLoadingCreate}
        handleOpenDialog={() => setIsOpenFormCreate(true)}
        handleCloseDialog={() => {
          setIsOpenFormCreate(false)
        }}
      />

      {currentContestNeedApprove && (
        <Dialog
          open={Boolean(currentContestNeedApprove)}
          onClose={() => {
            setCurrentContestNeedApprove(null)
          }}
          fullWidth={true}
          maxWidth="lg"
        >
          <DialogTitle>Danh sách chi tiết các bài vẽ</DialogTitle>
          <DialogContent>
            <TableCustomerDrawings contestId={currentContestNeedApprove} />
          </DialogContent>
        </Dialog>
      )}
    </Container>
  )
}

export default ContestManageContainer

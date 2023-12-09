import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useState } from 'react'

import CustomTabPanel from 'libs/ui/custom-components/CustomTabPanel'

import { Contest } from '../types'

import ContestLeaderboard from './ContestLeaderboard'
import ContestPaint from './ContestPaint'
import ContestRules from './ContestRules'

type Props = {
  contest: Contest
}

const TabsContestDetail = ({ contest }: Props) => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  console.log(value, contest)

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Tổng quan" id="overview" />
          <Tab label="Bài vẽ" id="images" />
          <Tab label="Hoạt động" id="activity" />
          <Tab label="Bảng xếp hạng" id="leaderboard" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ContestRules contest={contest} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ContestPaint contest={contest} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <ContestLeaderboard />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel> */}
    </Box>
  )
}

export default TabsContestDetail

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function CreateActivityRequirementsRewards({ children }: Props) {
  const handleChange = () => {}
  return (
    <Card>
      <CardContent>
        <Box width="64%">
          <Stack gap="48px">
            <Box>
              <Box>
                <InputLabel>What are the requirements for the attendee?</InputLabel>
                <Select onChange={handleChange} placeholder="Select requirement" value={0} autoWidth>
                  <MenuItem disabled value={0}>
                    Select requirement
                  </MenuItem>
                  <MenuItem value={10}>Ten years old</MenuItem>
                  <MenuItem value={20}>Twenty years old</MenuItem>
                  <MenuItem value={30}>Thirty years old</MenuItem>
                </Select>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{ marginTop: '16px', padding: '6px 12px' }}
              >
                <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
                  <Icon color="primary" sx={{ fontSize: '16px', lineHeight: '16px' }}>
                    add_circle
                  </Icon>
                  <Typography fontWeight={700} fontSize={14}>
                    Add other requirement
                  </Typography>
                </Stack>
              </Button>
            </Box>
            {/* <TextField
            id="activityName"
            variant="outlined"
            label="What are the requirements for the attendee?"
            placeholder="Select requirement"
          /> */}
            <Stack gap="16px">
              <TextField
                id="activityName"
                variant="outlined"
                label="How many Kolektivo Points can each attendee earn? "
                placeholder="Enter amount of points"
              />
            </Stack>
            {/* <TextField
              id="activityName"
              variant="outlined"
              label="Which stamps can the attendee earn?"
              placeholder="Select stamp"
            /> */}
            <Box>
              <InputLabel>Which stamps can the attendee earn?</InputLabel>
              <Select id="demo-simple-select" label="Age" onChange={handleChange} autoWidth>
                <MenuItem value={10}>Ten years old</MenuItem>
                <MenuItem value={20}>Twenty years old</MenuItem>
                <MenuItem value={30}>Thirty years old</MenuItem>
              </Select>
            </Box>
          </Stack>
        </Box>
      </CardContent>
      <Divider />
      {children}
    </Card>
  )
}

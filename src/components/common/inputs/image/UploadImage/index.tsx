import { type ReactElement } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'

const UploadImage = ({
  placeholder = 'Photo',
  height = 450,
  width = 800,
}: {
  placeholder?: string
  height?: number
  width?: number
}): ReactElement => {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" gap={5}>
      <Box
        width={285}
        height={160}
        sx={{ backgroundColor: '#F2F2F2', borderRadius: '12px' }}
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <Typography variant="subtitle2" textTransform="uppercase" color="#A9A9A9">
          {placeholder}
        </Typography>
      </Box>
      <Stack gap={3}>
        <Box>
          <Button variant="contained" color="secondary" size="small">
            Upload a photo
          </Button>
        </Box>
        <Typography variant="caption" color="text.secondary" maxWidth={272}>
          At least {width}x{height} px recommended. JPG or PNG is allowed
        </Typography>
      </Stack>
    </Stack>
  )
}

export default UploadImage

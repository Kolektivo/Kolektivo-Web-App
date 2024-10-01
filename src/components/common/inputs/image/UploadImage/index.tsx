'use client'

import { type ChangeEvent, useRef, type ReactElement, useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import Image from 'next/image'

const UploadImage = ({
  placeholder = 'Photo',
  height = 450,
  width = 800,
}: {
  placeholder?: string
  height?: number
  width?: number
}): ReactElement => {
  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleUploadPhoto = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click()
    }
  }
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file) ? URL.createObjectURL(file) : '')
    }
  }

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
        {preview ? (
          <Image src={preview} alt="Selected" width={285} height={160} style={{ borderRadius: '12px' }} />
        ) : (
          <Typography variant="subtitle2" textTransform="uppercase" color="#A9A9A9">
            {placeholder}
          </Typography>
        )}
      </Box>
      <Stack gap={3}>
        <Box>
          <Button onClick={handleUploadPhoto} variant="contained" color="secondary" size="small">
            Upload a photo
          </Button>
          <input
            type="file"
            ref={inputFileRef}
            style={{ display: 'none' }}
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" maxWidth={272}>
          At least {width}x{height} px recommended. JPG or PNG is allowed
        </Typography>
      </Stack>
    </Stack>
  )
}

export default UploadImage

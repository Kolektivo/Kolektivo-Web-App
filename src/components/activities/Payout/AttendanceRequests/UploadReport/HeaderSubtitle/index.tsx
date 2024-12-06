import DialogSuccess from '@/components/common/modals/DialogSuccess'
import { Button, Icon, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

export default function HeaderSubtitle() {
  const router = useRouter()
  const [report, setReport] = useState<File | null>()
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const handleSkip = () => {
    router.push('/activities')
  }
  const handleSelectReport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const file: File | undefined = event.target.files[0]
    if (file && file.type === 'application/pdf') {
      setReport(file)
    }
  }

  const handleComplete = () => {
    setOpenSuccessDialog(true)
  }

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack gap="4px" marginTop={4}>
        <Typography variant="body1" color="text.secondary">
          1. Fill in the Activity Report Template (click here for template)
        </Typography>
        <Stack direction="row" gap="4px">
          <Typography variant="body1" color="text.secondary">
            2.&nbsp;
            {report?.name && <>Uploaded: </>}
          </Typography>
          <Typography onClick={handleSelectReport} variant="body1" color="black" sx={{ cursor: 'pointer' }}>
            {report?.name ? <u>{report.name}</u> : <u>Upload Activity Report (.pdf)</u>}
          </Typography>
          {report?.name ? (
            <Stack direction="row">
              <Icon color="strongSuccess">check_circle</Icon>
              <Icon
                onClick={() => setReport(null)}
                color="lightGray"
                style={{ fontSize: '20px', fontWeight: '700', cursor: 'pointer' }}
              >
                close
              </Icon>
            </Stack>
          ) : (
            <Icon color="strongOrange">upload</Icon>
          )}

          <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={handleFileChange} />
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="center" gap="16px">
        <Button onClick={handleSkip}>Skip for now</Button>
        <Button
          onClick={handleComplete}
          color="primary"
          variant="contained"
          className="stepperButton"
          disabled={!report}
        >
          Complete
        </Button>
      </Stack>
      <DialogSuccess
        open={openSuccessDialog}
        title="Activity Completed"
        description="Your activity has been successfully completed"
        onClickButton={() => router.push('/activities')}
      />
    </Stack>
  )
}

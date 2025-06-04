import DialogSuccess from '@/components/common/modals/DialogSuccess'
import activitiesService from '@/features/activities/services/activities.service'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { type ActivityReviewType } from '@/types/activities'
import { Button, Icon, Stack, Typography } from '@mui/material'
import { type User } from '@supabase/supabase-js'
import { useParams, useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

export default function HeaderSubtitle() {
  const router = useRouter()
  const { id } = useParams()
  const { user } = useAuth()
  const [report, setReport] = useState<File | null>()
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleSkip = () => {
    router.push('/activities')
  }

  const handleDownloadReportTemplate = () => {
    const fileUrl = '/activityFinishReport.docx'
    const anchor = document.createElement('a')
    anchor.href = fileUrl
    anchor.download = 'report-template.docx'
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
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

  const handleComplete = async () => {
    if (!report) return
    const reader = new FileReader()
    const activity = await activitiesService.get(user ?? undefined, id as string)
    reader.onload = () => {
      if (reader.result) {
        const base64String = reader.result.toString().split(',')[1]
        if (!activity) return
        activity[0].report_src = base64String
        const activityReview: ActivityReviewType = {
          banner: activity[0].banner_src ?? '',
          name: activity[0].title,
          description: activity[0].description,
          date: activity[0].start_date,
          endTime: activity[0].time_lapse.split('-')[1],
          startTime: activity[0].time_lapse.split('-')[0],
          kolectivoPoints: Number(activity[0].points) ?? 0,
          location: activity[0].location ?? '',
          longitude: activity[0].longitude ?? 0,
          latitude: activity[0].latitude ?? 0,
          requirements: activity[0].requirements,
          stamps: activity[0].stamp ?? '',
          state: 'completed',
          report: activity[0].report_src,
        }
        activitiesService.updateCompletedActivity(activityReview, user as User, id as string)
      }
    }
    setOpenSuccessDialog(true)

    reader.onerror = (error) => {
      console.error('Error converting file to Base64:', error)
    }

    reader.readAsDataURL(report)
  }

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack gap="4px" marginTop={4}>
        <Typography variant="body1" color="text.secondary">
          1. Fill in the Activity Report Template{' '}
          <u onClick={handleDownloadReportTemplate} style={{ cursor: 'pointer' }}>
            (click here for template)
          </u>
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

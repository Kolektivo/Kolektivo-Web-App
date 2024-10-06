import UploadImage from '@/components/common/inputs/image/UploadImage'
import { Button, Card, CardActions, CardContent, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'

type Props = {
  handleBack: () => void
  handleSubmit: (img: string) => void
}

export default function CreateActivityBannerForm({ handleBack, handleSubmit }: Props) {
  const [banner, setBanner] = useState<string>()

  const handleBannerChange = (img: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setBanner(reader.result as string)
    }

    reader.readAsDataURL(img)
  }

  useEffect(() => {
    console.log(banner)
  }, [banner])

  return (
    <Card>
      <CardContent>
        <form action="">
          <UploadImage placeholder="Activity Banner" previewBase64={banner} onChangeImage={handleBannerChange} />
        </form>
      </CardContent>
      <CardActions>
        <Button onClick={handleBack} color="secondary">
          Go Back
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" className="stepperButton" disabled={!banner}>
          Next
        </Button>
      </CardActions>
      <Divider />
    </Card>
  )
}

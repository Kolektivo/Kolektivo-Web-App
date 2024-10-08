import UploadImage from '@/components/common/inputs/image/UploadImage'
import { Button, Card, CardActions, CardContent, Divider } from '@mui/material'
import React, { useState } from 'react'

type Props = {
  handleBack: () => void
  handleSubmit: () => void
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
        <Button
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onClick={(_) => handleSubmit(banner as string)}
          variant="contained"
          color="primary"
          className="stepperButton"
          disabled={!banner}
        >
          Next
        </Button>
      </CardActions>
      <Divider />
    </Card>
  )
}

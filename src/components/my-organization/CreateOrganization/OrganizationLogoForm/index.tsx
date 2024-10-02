import { useState, type ReactElement } from 'react'
import UploadImage from '@/components/common/inputs/image/UploadImage'
import { Button, Card, CardActions, CardContent, Stack } from '@mui/material'
import HeaderCard from '@/components/common/cards/HeaderCard'

type OrganizationLogoFormProps = {
  defaultLogoBase64?: string
  onCancel?: (imageBase64: string | undefined) => void
  onSubmit: (imageBase64: string) => void
}

const OrganizationLogo = ({ defaultLogoBase64, onCancel, onSubmit }: OrganizationLogoFormProps): ReactElement => {
  const [logoBase64, setLogoBase64] = useState<string | undefined>(defaultLogoBase64)

  const handleSubmit = () => {
    onSubmit(logoBase64!)
  }

  const handleChangeLogo = (image: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = () => {
      setLogoBase64(reader.result?.toString())
    }
  }

  const handleCancelation = () => {
    if (onCancel) {
      onCancel(logoBase64)
    }
  }

  return (
    <Stack>
      <HeaderCard title="Organization Logo" />
      <Card>
        <CardContent>
          <UploadImage
            placeholder="Organization Logo"
            previewBase64={defaultLogoBase64}
            onChangeImage={handleChangeLogo}
          />
        </CardContent>
        <CardActions>
          {onCancel && <Button onClick={handleCancelation}>Go Back</Button>}
          <Button variant="contained" onClick={handleSubmit} disabled={!logoBase64}>
            Complete
          </Button>
        </CardActions>
      </Card>
    </Stack>
  )
}

export default OrganizationLogo

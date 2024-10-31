import { useState, type ReactElement } from 'react'
import UploadImage from '@/components/common/inputs/image/UploadImage'
import { Button, Card, CardActions, CardContent, Stack } from '@mui/material'
import HeaderCard from '@/components/common/cards/HeaderCard'
import LoadingButton from '@/components/common/buttons/LoadingButton'

type OrganizationLogoFormProps = {
  defaultLogoBase64: string | null
  loading?: boolean
  onCancel?: (imageBase64: string | null) => void
  onSubmit: (imageBase64: string) => void
}

const OrganizationLogo = ({
  defaultLogoBase64,
  onCancel,
  onSubmit,
  loading = false,
}: OrganizationLogoFormProps): ReactElement => {
  const [logoBase64, setLogoBase64] = useState<string | null>(defaultLogoBase64)

  const handleSubmit = () => {
    onSubmit(logoBase64!)
  }

  const handleChangeLogo = (image: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = () => {
      setLogoBase64(reader.result?.toString() ?? null)
    }
  }

  const handleCancelation = () => {
    if (onCancel) {
      onCancel(logoBase64 ?? null)
    }
  }

  return (
    <Stack gap={4}>
      <HeaderCard title="Organization Logo" />
      <Card>
        <CardContent>
          <UploadImage
            placeholder="Organization Logo"
            previewBase64={defaultLogoBase64 ?? undefined}
            onChangeImage={handleChangeLogo}
          />
        </CardContent>
        <CardActions>
          {onCancel && (
            <Button onClick={handleCancelation} disabled={loading}>
              Go Back
            </Button>
          )}
          <LoadingButton loading={loading} disabled={!logoBase64} variant="contained" onClick={handleSubmit}>
            Complete
          </LoadingButton>
        </CardActions>
      </Card>
    </Stack>
  )
}

export default OrganizationLogo

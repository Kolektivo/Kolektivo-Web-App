import { Box, Link, Typography } from '@mui/material'
import React from 'react'
type Props = {
  href: string
}

export default function GoBackBox({ href }: Props) {
  return (
    <Box padding="24px">
      <Link href={href}>
        <Typography variant="h4" textAlign="right">
          Go back
        </Typography>
      </Link>
    </Box>
  )
}

import { type ReactElement } from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { type ImgHTMLAttributes } from 'react'

const FallbackImage = ({ src, width, height, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>): ReactElement => {
  const widthImage: number = width ? parseInt(width.toString()) : 0
  const heightImage: number = height ? parseInt(height.toString()) : 0

  return (
    <Box
      width={width}
      height={height}
      sx={{ backgroundColor: '#F2F2F2', borderRadius: '12px' }}
      justifyContent="center"
      alignItems="center"
      display="flex"
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? 'image'}
          height={heightImage}
          width={widthImage}
          {...props}
          style={{ borderRadius: '12px' }}
        />
      ) : (
        <Typography
          variant="subtitle2"
          textTransform="uppercase"
          textOverflow="ellipsis"
          overflow="hidden"
          color="#A9A9A9"
          width="100%"
        >
          {alt}
        </Typography>
      )}
    </Box>
  )
}

export default FallbackImage

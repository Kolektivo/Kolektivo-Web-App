import { Card, CardContent, type CardProps, Icon, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import IconKtt from '../../display/IconKtt'

type Props = {
  title: string
  value: string
  icon: string
  cardProps?: CardProps
}

export default function ValueCard({ title, value, cardProps, icon }: Props) {
  if (value == '')
    return (
      <Card {...cardProps} sx={{ height: '100%' }}>
        <CardContent>
          <Stack gap="16px">
            {icon === 'ktt' ? (
              <IconKtt />
            ) : (
              <Icon color="primary" sx={{ fontSize: '32px', lineHeight: '32px' }}>
                {icon}
              </Icon>
            )}
            <Typography variant="overline" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontSize: '28px', lineHeight: '28px' }}>
              <Skeleton width={70} height={40}/>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    )

  return (
    <Card {...cardProps} sx={{ height: '100%' }}>
      <CardContent>
        <Stack gap="16px">
          {icon === 'ktt' ? (
            <IconKtt />
          ) : (
            <Icon color="primary" sx={{ fontSize: '32px', lineHeight: '32px' }}>
              {icon}
            </Icon>
          )}
          <Typography variant="overline" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontSize: '28px', lineHeight: '28px' }}>
            {value}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

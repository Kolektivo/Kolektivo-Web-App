
import { vendorsActionCards } from '@/constants/vendors/main'
import { Stack } from '@mui/material'
import React from 'react'
import ActionCard from '../../common/cards/ActionCard'
import { type IconColor } from '@/types/common/colors'

export default function VendorsActions() {
  return (
    <Stack direction="row" alignItems="center" gap="24px">
      {vendorsActionCards.map((card, index) => (
        <div key={index} style={{ flex: '1' }}>
          <ActionCard
            icon={card.icon}
            iconColor={card.iconColor as IconColor}
            title={card.title}
            description={card.description}
            textButton={card.textButton}
            href={card.href}
            isSecondary={card.isSecondary}
          />
        </div>
      ))}
    </Stack>
  )
}

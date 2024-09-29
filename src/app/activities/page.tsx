import ActionCard from '@/components/common/cards/ActionCard'
import { activitiesActionCards } from '@/constants/activities/main'
import { type IconColor } from '@/types/common/colors'
import { Stack } from '@mui/material'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Activities',
}

export default function Page() {
  return (
    <Stack direction="row" alignItems="center" gap="24px">
      {activitiesActionCards.map((card, index) => (
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

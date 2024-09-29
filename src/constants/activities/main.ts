import activityImage from '@/public/images/activities/Event.svg'

export const activitiesActionCards = [
  {
    icon: 'add_circle',
    iconColor: 'primary',
    title: 'Create Activity',
    description: 'Set up new activities for your community.',
    textButton: 'Create',
    href: '/activities/create',
  },
  {
    icon: 'replay',
    iconColor: 'strongOrange',
    title: 'Update activity',
    description: 'Make changes to your existing activities.',
    textButton: 'Update',
    isSecondary: true,
    href: '/activities/update',
  },
]

export const myActivities = [
  {
    imgSrc: activityImage,
    title: 'BRGR HAUS',
    description: 'Kura Hulanda Village, 3 Langestraat',
    state: 'upcoming',
  },
  {
    imgSrc: activityImage,
    title: 'Esperamos Caracasbaai',
    description: 'Caracasbaaiweg 280 Unit 10, Eden Mall',
    state: 'upcoming',
  },
]

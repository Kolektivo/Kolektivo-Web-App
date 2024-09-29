import vendor1Image from '@/public/images/vendors/Frame 1000001685.svg'
import vendor2Image from '@/public/images/vendors/image 14.svg'

export const activitiesActionCards = [
  {
    icon: 'add_circle',
    iconColor: 'primary',
    title: 'Create Activity',
    description: 'Set up new activities for your community.',
    textButton: 'Create',
    href: '/my-organization/create',
  },
  {
    icon: 'replay',
    iconColor: 'strongOrange',
    title: 'Update activity',
    description: 'Make changes to your existing activities.',
    textButton: 'Update',
    isSecondary: true,
    href: '/my-organization/create',
  },
]

export const vendors = [
  {
    imgSrc: vendor1Image,
    title: 'BRGR HAUS',
    description: 'Kura Hulanda Village, 3 Langestraat',
  },
  {
    imgSrc: vendor2Image,
    title: 'Esperamos Caracasbaai',
    description: 'Caracasbaaiweg 280 Unit 10, Eden Mall',
  },
]

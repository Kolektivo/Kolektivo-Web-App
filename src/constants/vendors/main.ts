
import vendor1Image from '@/public/images/vendors/Frame 1000001685.svg'
import vendor2Image from '@/public/images/vendors/image 14.svg'

export const vendorsActionCards = [
  {
    icon: 'add_circle',
    iconColor: 'primary',
    title: 'Create New Vendor profile',
    description: 'Set up new vendor profiles for your community.',
    textButton: 'Create',
    href: '/my-organization/create',
  },
  {
    icon: 'replay',
    iconColor: 'strongOrange',
    title: 'Update Vendor',
    description: 'Make changes to your existing vendor profiles.',
    textButton: 'Update',
    isSecondary: true,
    href: '/my-vendor/update',
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

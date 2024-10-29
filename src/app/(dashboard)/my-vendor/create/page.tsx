import CreateVendor from '@/components/vendors/CreateVendor'
import { type Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Create Vendor',
}

export default function Page() {
  return <CreateVendor />
}

import UpdateVendor from '@/components/vendors/UpdateVendor'
import { type Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Update Vendor',
}

export default function UpdateVendorPage({ params }: { params: { id: string } }) {
  return <UpdateVendor id={params.id} />
}

'use client'

import { Alert, Box, Button, CardContent, Divider } from '@mui/material'
import React, { type ReactNode } from 'react'
import ItemsCard from '@/components/common/cards/ItemsCard'
import vendorsService from '@/features/vendors/services/vendors.service'
import VendorItem from '../VendorItem'
import VendorItemSkeleton from '../VendorItem/Skeleton'
import useSWR from 'swr'

export default function MyVendorsCard({ actions, isUpdate = false }: { actions?: ReactNode; isUpdate?: boolean }) {
  const { data, error, isValidating, mutate } = useSWR('/api/vendors', vendorsService.fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  })

  return (
    <ItemsCard title="My Vendor(s)" actions={actions}>
      {isValidating && (
        <CardContent>
          <VendorItemSkeleton />
        </CardContent>
      )}
      {error && (
        <CardContent>
          <Alert
            severity="error"
            variant="filled"
            action={
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => {
                  mutate()
                }}
              >
                Reload
              </Button>
            }
          >
            An error occurred
          </Alert>
        </CardContent>
      )}
      {data?.map((vendor, index) => (
        <Box key={index}>
          {index > 0 && <Divider />}
          <VendorItem vendor={vendor} enabledEdit={isUpdate} />
        </Box>
      ))}
    </ItemsCard>
  )
}

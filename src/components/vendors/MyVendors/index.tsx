'use client'

import { Alert, Box, Button, CardContent, Divider } from '@mui/material'
import React, { type ReactNode } from 'react'
import ItemsCard from '@/components/common/cards/ItemsCard'
import { useQuery } from '@tanstack/react-query'
import { type Vendor } from '@/types/vendors'
import vendorsService from '@/features/vendors/services/vendors.service'
import VendorItem from '../VendorItem'
import VendorItemSkeleton from '../VendorItem/Skeleton'

export default function MyVendorsCard({ actions, isUpdate = false }: { actions?: ReactNode; isUpdate?: boolean }) {
  const { data, isLoading, error, refetch } = useQuery<Vendor[] | undefined>({
    queryKey: ['getMyVendors'],
    queryFn: async () => await vendorsService.getAll(),
  })

  return (
    <ItemsCard title="My Vendor(s)" actions={actions}>
      {isLoading && (
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
                  refetch()
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

'use client'

import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function UpdateActivity() {
  const params = useParams()
  const { id } = params // Get the id from the path params
  useEffect(() => {
    console.log(id)
  }, [id])
  return (
    <div>
      <div>lalala</div>
      paadsasd
    </div>
  )
}

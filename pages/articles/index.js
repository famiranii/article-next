import { useRouter } from 'next/router'
import React from 'react'

export default function Index() {
    const router = useRouter()
    router.push("/")
  return (
    <div>index</div>
  )
}

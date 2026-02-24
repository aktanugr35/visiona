'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function ConditionalNavbar() {
    const pathname = usePathname()
    // Ana sayfada mevcut navbar'ı render etme — InteractiveHero kendi navbar'ını gösteriyor
    if (pathname === '/') return null
    return <Navbar />
}

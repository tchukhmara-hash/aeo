'use server'

import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function createCampaign(formData: FormData) {
  const brandName = formData.get('brandName') as string
  const competitorsString = formData.get('competitors') as string
  const keywordsString = formData.get('keywords') as string

  if (!brandName || !keywordsString) {
    throw new Error('Brand name and at least one keyword are required.')
  }

  const competitors = competitorsString.split(',').map((c) => c.trim()).filter(Boolean)
  const keywords = keywordsString.split(',').map((k) => k.trim()).filter(Boolean)

  // 1. Create or get dummy organization
  let org = await prisma.organization.findFirst()
  if (!org) {
    org = await prisma.organization.create({
      data: {
        name: 'Default Org',
        email: 'user@example.com',
      },
    })
  }

  // 2. Create the Brand
  const brand = await prisma.brand.create({
    data: {
      name: brandName,
      organizationId: org.id,
      competitors: {
        create: competitors.map((c) => ({ name: c })),
      },
      targetKeywords: {
        create: keywords.map((k) => ({ keyword: k })),
      },
    },
  })

  // 3. Trigger Inngest worker to start audit? (We'll implement this later)

  // Redirect to dashboard
  redirect('/dashboard')
}

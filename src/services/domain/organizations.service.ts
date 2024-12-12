import { createAnonymousClient } from "@/utils/supabase/anonymousClient"
import Bucket from "@/utils/supabase/bucket"
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

const ORGANIZATIONS = 'organizations'

export async function getOrganizations() {
  const supabaseClient = createAnonymousClient()
  const supabaseClientAuth = createClient()
  const user = await supabaseClientAuth.auth.getUser()
  const idUser = user.data.user?.id

  const { data, error } = await supabaseClient.from(ORGANIZATIONS).select().eq('created_by', idUser)
  if (error) return NextResponse.json(error, { status: 500 })

  const organizationsWithLogos = await Promise.all(
    data.map(async (organization) => {
      const logoSrc = await Bucket.downloadFile(organization.logoPath)
      return { ...organization, logoSrc }
    }),
  )

  return NextResponse.json(organizationsWithLogos)
}
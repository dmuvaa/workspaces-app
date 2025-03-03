import { notFound } from 'next/navigation'
import { WorkspaceDetails } from '@/components/WorkspaceDetails'
import { prisma } from '@/lib/prisma'

async function getWorkspace(id: string) {
  const workspace = await prisma.workspace.findUnique({
    where: { id },
    include: {
      location: {
        include: {
          city: {
            include: {
              country: true
            }
          }
        }
      },
      amenities: true,
      reviews: {
        include: {
          user: true
        }
      },
      user: true
    }
  })

  if (!workspace) {
    return null
  }

  return {
    ...workspace,
    location: {
      address: workspace.location.address,
      city: workspace.location.city.name,
      country: workspace.location.city.country.name
    },
    amenities: workspace.amenities.map(a => a.name),
    reviews: workspace.reviews.map(review => ({
      rating: review.rating,
      comment: review.comment,
      user: {
        name: review.user.name
      }
    }))
  }
}

export default async function WorkspacePage({ params }: { params: { id: string } }) {
  const workspace = await getWorkspace(params.id)

  if (!workspace) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <WorkspaceDetails workspace={workspace} />
    </div>
  )
}

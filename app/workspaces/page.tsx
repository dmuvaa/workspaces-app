import { prisma } from '../../lib/prisma'
import { WorkspaceCard } from '../../components/WorkspaceCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

async function getWorkspaces(page: number = 1, pageSize: number = 10, search: string = '', filter: string = '') {
  const where = {
    AND: [
      search ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      } : {},
      filter ? { officeTypes: { has: filter } } : {},
    ],
  }

  const workspaces = await prisma.workspace.findMany({
    where,
    take: pageSize,
    skip: (page - 1) * pageSize,
    include: {
      location: {
        include: {
          city: true
        }
      },
      reviews: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const total = await prisma.workspace.count({ where })

  return {
    workspaces: workspaces.map(workspace => ({
      id: workspace.id,
      name: workspace.name,
      location: `${workspace.location.city.name}`,
      image: workspace.images[0] || "/placeholder.svg",
      rating: workspace.reviews.reduce((acc, review) => acc + review.rating, 0) / workspace.reviews.length || 0,
      reviews: workspace.reviews.length
    })),
    total
  }
}

async function getOfficeTypes() {
  const types = await prisma.workspace.findMany({
    select: {
      officeTypes: true
    },
    distinct: ['officeTypes']
  })

  return Array.from(new Set(types.flatMap(t => t.officeTypes)))
}

export default async function WorkspacesPage({
  searchParams
}: {
  searchParams: { page?: string, search?: string, filter?: string }
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const pageSize = 10
  const search = searchParams.search || ''
  const filter = searchParams.filter || ''

  const { workspaces, total } = await getWorkspaces(page, pageSize, search, filter)
  const officeTypes = await getOfficeTypes()

  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Workspaces</h1>
      
      <div className="flex space-x-4 mb-6">
        <Input 
          type="text" 
          placeholder="Search workspaces..." 
          defaultValue={search}
          onChange={(e) => {
            const newSearch = new URLSearchParams(searchParams)
            newSearch.set('search', e.target.value)
            window.location.search = newSearch.toString()
          }}
        />
        <Select 
          defaultValue={filter} 
          onValueChange={(value) => {
            const newSearch = new URLSearchParams(searchParams)
            newSearch.set('filter', value)
            window.location.search = newSearch.toString()
          }}
        >
          <option value="">All Types</option>
          {officeTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspaces.map((workspace) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} />
        ))}
      </div>

      <div className="mt-8 flex justify-center space-x-2">
        {page > 1 && (
          <Button variant="outline" href={`/workspaces?page=${page - 1}&search=${search}&filter=${filter}`}>
            Previous
          </Button>
        )}
        {page < totalPages && (
          <Button variant="outline" href={`/workspaces?page=${page + 1}&search=${search}&filter=${filter}`}>
            Next
          </Button>
        )}
      </div>
    </div>
  )
}


import { WorkspaceForm } from '../../components/WorkspaceForm'

export default function CreateWorkspacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Workspace</h1>
      <WorkspaceForm />
    </div>
  )
}


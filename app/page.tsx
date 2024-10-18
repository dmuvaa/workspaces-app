import WorkspaceList from '@/components/WorkspaceList';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Discover Global Workspaces</h1>
      <SearchBar />
      <WorkspaceList />
    </div>
  );
}
import { useProjectsQuery } from "@/gql/project.generated";

export const AdminPage = () => {
  const { data, loading, error } = useProjectsQuery();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{JSON.stringify(data?.projects)}</div>;
};

"use client";

import { useProjectsQuery } from "@/gql/project.generated";
import { Button } from "antd";

export default function Home() {
  const { data, loading, error } = useProjectsQuery();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Button variant="solid" color="primary">
        Click me
      </Button>
      <pre>{JSON.stringify(data?.projects, null, 2)}</pre>
    </div>
  );
}

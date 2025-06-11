import { LayoutWithBreadcrumb } from "@/components/layout/LayoutWithBreadcrumb";

export const HomePage = () => {
  return (
    <LayoutWithBreadcrumb withBreadcrumb={false}>
      <div>HomePage</div>
    </LayoutWithBreadcrumb>
  );
};

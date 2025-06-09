"use client";

import { AdminMenu } from "@/config/routes";
import { useParams } from "next/navigation";
import { RolePage } from "./RolePage";
import { UserPage } from "./UserPage";

export const AdminPage = () => {
  const params = useParams();
  const tab = (params.menu as AdminMenu) || AdminMenu.Users;

  switch (tab) {
    case AdminMenu.Users:
      return <UserPage />;
    case AdminMenu.Roles:
      return <RolePage />;
    default:
      return <UserPage />;
  }
};

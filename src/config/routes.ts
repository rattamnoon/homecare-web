export enum AdminMenu {
  Users = "users",
  Roles = "roles",
}

export const Routes = {
  Home: "/home",
  Login: "/login",
  Tasks: "/tasks",
  Dashboard: "/dashboard",
  Admin: (menu: AdminMenu) => `/admin/${menu}`,
  System: "/system",
};

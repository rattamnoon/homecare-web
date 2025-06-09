export enum AdminMenu {
  User = "user",
  Role = "role",
}

export enum TaskMenu {
  Repair = "repair",
  Juristic = "juristic",
  Service = "service",
  Central = "central",
}

export const Routes = {
  Home: "/home",
  Login: "/login",
  Tasks: "/tasks",
  TasksRepair: "/tasks/repair",
  TasksJuristicService: "/tasks/juristic/service",
  TasksJuristicCentral: "/tasks/juristic/central",
  Dashboard: "/dashboard",
  Admin: "/admin",
  AdminUsers: "/admin/user",
  AdminRoles: "/admin/role",
  System: "/system",
};

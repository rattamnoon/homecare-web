export const Routes = {
  Home: "/home",
  Login: "/login",
  Tasks: "/tasks",
  TasksRepair: "/tasks/repair",
  TasksRepairDetail: (id: string) => `/tasks/repair/${id}`,
  TasksRepairCallCenter: "/tasks/repair/call-center",
  TasksRepairPending: "/tasks/repair/pending",
  TasksRepairWaitingApproval: "/tasks/repair/waiting-approval",
  TasksRepairCreate: "/tasks/repair/create",
  TasksRepairCalendar: "/tasks/repair/calendar",
  TasksJuristicService: "/tasks/juristic/service",
  TasksJuristicServiceCreate: "/tasks/juristic/service/create",
  TasksJuristicServiceDetail: (id: string) => `/tasks/juristic/service/${id}`,
  TasksJuristicCentral: "/tasks/juristic/central",
  TasksJuristicCentralCreate: "/tasks/juristic/central/create",
  TasksJuristicCentralDetail: (id: string) => `/tasks/juristic/central/${id}`,
  Dashboard: "/dashboard",
  Admin: "/admin",
  AdminUsers: "/admin/user",
  AdminRoles: "/admin/role",
  System: "/system",
  SystemMaster: "/system/master",
  SystemInsuranceExpand: "/system/insurance-expand",
  SystemNotification: "/system/notification",
};

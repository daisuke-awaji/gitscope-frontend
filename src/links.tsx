import ProjectUsageContent from "./components/Pages/CostPage/ProjectUsageContent";
import SettingsIcon from "@material-ui/icons/Settings";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ProductivityPage from "./components/Pages/ProductivityPage/ProductivityPage";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DashboardIcon from "@material-ui/icons/Dashboard";
import React from "react";
import { RepositoryPage } from "./components/Pages/RepositoryPage/RepositoryPage";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import { JobsPage } from "./components/Pages/JobsPage/JobsPage";
import { RepositorySetting } from "./components/Pages/RepositoryPage/RepositorySetting";
import { Setting } from "./components/Pages/SettingPage/Setting";
import { CollaborationPage } from "./components/Pages/CollaborationPage/CollaborationPage";

export type Link = {
  id: string;
  category: string;
  icon: any;
  path: string;
  children: LinkItem[];
};
type LinkItem = {
  label?: string;
  to: string;
  component: any;
};
export const links: Link[] = [
  {
    id: "Dashboard",
    category: "Develop",
    icon: <DashboardIcon />,
    path: "/dashboard",
    children: [
      {
        label: "Productivity",
        to: "/dashboard",
        component: <ProductivityPage />,
      },
      {
        label: "Collaboration",
        to: "/dashboard/collaboration",
        component: <CollaborationPage />,
      },
    ],
  },
  {
    id: "Jobs",
    category: "Develop",
    icon: <BeachAccessIcon />,
    path: "/jobs",
    children: [
      {
        label: "Jobs",
        to: "/jobs",
        component: <JobsPage />,
      },
    ],
  },
  {
    id: "Repositories",
    category: "Develop",
    icon: <AccountTreeIcon />,
    path: "/repositories",
    children: [
      {
        label: "Repositories",
        to: "/repositories",
        component: <RepositoryPage />,
      },
      {
        to: "/repositories/:id",
        component: <RepositorySetting />,
      },
    ],
  },
  {
    id: "Settings",
    category: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
    children: [
      {
        label: "Setting",
        to: "/settings",
        component: <Setting />,
      },
    ],
  },

  {
    id: "Cost",
    category: "Cost",
    icon: <AttachMoneyIcon />,
    path: "/cost",
    children: [
      {
        label: "Cost",
        to: "/cost",
        component: <ProjectUsageContent />,
      },
    ],
  },
];

type Categories = { [key: string]: Link[] };

export const categories = links.reduce((prev, current, index) => {
  if (!prev[current.category]) prev[current.category] = [];
  prev[current.category].push(current);
  return prev;
}, {} as Categories);

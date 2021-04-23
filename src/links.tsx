import ProjectUsageContent from "./components/CostPage/ProjectUsageContent";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ProductivityPage from "./components/ProductivityPage/ProductivityPage";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DashboardIcon from "@material-ui/icons/Dashboard";
import React from "react";
import { RepositoryPage } from "./components/RepositoryPage/RepositoryPage";

export type Link = {
  id: string;
  category: string;
  icon: any;
  path: string;
  children: LinkItem[];
};
type LinkItem = {
  label: string;
  to: string;
  component: any;
};
export const links: Link[] = [
  // {
  //   id: "Authentication",
  //   category: "Develop",
  //   icon: <PeopleIcon />,
  //   path: "/authentication",
  //   children: [
  //     {
  //       label: "Pets",
  //       to: "/authentication",
  //       component: <Pokemons />,
  //     },
  //     {
  //       label: "Sign-in method",
  //       to: "/authentication/providers",
  //       component: <div>xxx</div>,
  //     },
  //     {
  //       label: "Templates",
  //       to: "/authentication/templates",
  //       component: <div>xxx</div>,
  //     },
  //   ],
  // },
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
        label: "Communication",
        to: "/dashboard/communication",
        component: <div>communication</div>,
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
    ],
  },
  {
    id: "Users",
    category: "Develop",
    icon: <PeopleIcon />,
    path: "/users",
    children: [
      {
        label: "HelloWorld",
        to: "/users",
        component: <div>xxx</div>,
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
        component: <div>settings</div>,
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

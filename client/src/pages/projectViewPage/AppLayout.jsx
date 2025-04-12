import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ProjectView from "./ProjectView";
import Navbar from "../Navbar/Navbar";

const AppLayout = ({ children }) => {
  const childrenArray = React.Children.toArray(children);

  const firstChild = childrenArray[0]; 
  const remainingChildren = childrenArray.slice(1); 

  return (
    <>
    <SidebarProvider>
      {firstChild}
      <SidebarTrigger />
      {remainingChildren}
    </SidebarProvider>
    </>
  );
};

export default AppLayout;

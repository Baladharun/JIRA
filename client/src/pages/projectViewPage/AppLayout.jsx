import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ProjectView from "./ProjectView";
import Navbar from "../Navbar/Navbar";
const AppLayout = ({ children }) => {
  return (
    <>
    <SidebarProvider>
      <ProjectView />
  
        <SidebarTrigger />
        {children}
    
    </SidebarProvider>
    </>
  );
};

export default AppLayout;

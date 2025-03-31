import { Button } from "@/components/ui/button";
import sampleImage from "/sample_image.jpg"; 
import {     
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { useState, useEffect } from "react"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons"; 
import { faGear } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((prevOpen) => !prevOpen);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <div className="flex p-3 items-center border-b border-gray-400 relative justify-between">
                <div className="flex">
                    <img src={sampleImage} style={{ height: "40px" }} alt="Logo" />
                    <h1 className="ml-4">hello</h1>
                </div>
                <div className="relative flex">
                    <Command shouldFilter={open}>
                        <CommandInput
                            placeholder="Type a command or search..."
                            onValueChange={(value) => setOpen(value.length > 0) }
                        />
                        <CommandList
                            className={`absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-md border border-gray-300 ${
                                open ? "block" : "hidden"
                            } z-[1000]`}
                        >
                            <CommandGroup heading="Suggestions">
                                <CommandItem>Calendar</CommandItem>
                                <CommandItem>Search Emoji</CommandItem>
                                <CommandItem>Calculator</CommandItem>
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup heading="Settings">
                                <CommandItem>Profile</CommandItem>
                                <CommandItem>Billing</CommandItem>
                                <CommandItem>Settings</CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                    <Button>Create Project</Button>
                </div>
                <div className="flex mr-[30px] gap-6">
                    <FontAwesomeIcon icon={faBell} className="text-2xl text-gray-600" />
                    <FontAwesomeIcon icon={faGear} className="text-2xl text-gray-600" />
                </div>
            </div>
        </>
    );
};

export default Navbar;

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { userStore } from "@/store";
import "./style.css";
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";

const CreateProject = () => {
    const [collaboraterName, setCollaboraterName] = useState("");
    const [collaborators, setCollaborators] = useState([]);
    const [stage, setStage] = useState("");
    const [stages, setStages] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [accessType, setAccessType] = useState("private");

    const addCollaborator = () => {
        if (collaboraterName.trim()) {
            setCollaborators([...collaborators, collaboraterName]);
            setCollaboraterName("");
        }
    };

    const addStage = () => {
        if (stage.trim()) {
            setStages([...stages, stage]);
            setStage("");
        }
    };

    const createProject = async () => {
        if (!projectName) {
            toast.error("Enter Project Name");
            return;
        }

        const userInfo = userStore.getState().userInfo; // Correct way to access store
        try {
            await axios.post("http://127.0.0.1:5174/project/new-project", {
                projectName,
                stages,
                collaborators,
                accessType,
                admin: userInfo?.name || "Unknown", // Handle missing userInfo
            });
            toast.success("Project created successfully!");
        } catch (error) {
            toast.error("Failed to create project.");
            console.error(error);
        }
    };

    return (
        <>
            <div className="container-p">
                <div className="col1">
                    <Input
                        type="text"
                        placeholder="Enter Project Name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    <br />
                    <Select onValueChange={(value) => setAccessType(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Project Access Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                    </Select>
                    <br />
                    <div className="flex items-center space-x-2 mb-2">
                        <Input
                            type="text"
                            placeholder="Add Collaborators"
                            value={collaboraterName}
                            onChange={(e) => setCollaboraterName(e.target.value)}
                        />
                        <Button type="button" onClick={addCollaborator}>
                            Add Member
                        </Button>
                    </div>
                    <ul>
                        {collaborators.map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ul>
                    <br />
                    <Button style={{ display: "block" }} onClick={createProject}>
                        Create Project
                    </Button>
                </div>
                <Separator className="separator w-[2px] h-[400px] ml-12 mr-6 bg-gray-300" orientation="vertical" />
                <div className="col2">
                    <h3>Choose Template</h3>
                    <div className="rectangle-box1">
                        <div
                            className="flex h-15 gap-3"
                            style={{
                                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                padding: "10px",
                            }}
                        >
                            <img src="/sample_image.jpg" alt="Sample" />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, nam?</p>
                        </div>
                        <div
                            className="flex h-15 ml-6 gap-3"
                            style={{
                                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                padding: "10px",
                            }}
                        >
                            <img src="/sample_image.jpg" alt="Sample" />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, nam?</p>
                        </div>
                    </div>
                    <div className="rectangle-box1">
                        <div
                            className="flex h-15 gap-3"
                            style={{
                                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                padding: "10px",
                            }}
                        >
                            <img src="/sample_image.jpg" alt="Sample" />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, nam?</p>
                        </div>
                        <div
                            className="flex h-15 ml-6 gap-3"
                            style={{
                                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                padding: "10px",
                            }}
                        >
                            <img src="/sample_image.jpg" alt="Sample" />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, nam?</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                        <Input
                            type="text"
                            placeholder="Custom Stage"
                            value={stage}
                            onChange={(e) => setStage(e.target.value)}
                        />
                        <Button type="button" onClick={addStage}>
                            Add Stage
                        </Button>
                    </div>
                    <ul>
                        {stages.map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default CreateProject;

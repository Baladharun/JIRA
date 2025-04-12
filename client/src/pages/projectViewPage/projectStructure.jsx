import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import axios from "axios";
import { Button } from "@/components/ui/button";

const ProjectStructure = ({ projectKey }) => {
  const [lanes, setLanes] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5174/project/getprojectDetails/${projectKey}`
        );
        const stages = res.data.stages;

        const formattedLanes = Object.entries(stages).map(([title, cards], index) => ({
          id: index + 1,
          title,
          cards: cards.map((card) => card.title || "Untitled"), // you can customize what to show
        }));

        setLanes(formattedLanes);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    fetchProject();
  }, [projectKey]);

  const addLane = () => {
    const title = prompt("Enter lane title:");
    if (title) {
      setLanes([...lanes, { id: Date.now(), title, cards: [] }]);
    }
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px", height: "80%" }}>
      {lanes.map((lane) => (
        <div
          key={lane.id}
          style={{
            background: "#f4f4f5",
            padding: "10px",
            borderRadius: "8px",
            width: "200px",
            minHeight: "80%",
            boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{lane.title}</h3>
          {lane.cards.map((card, i) => (
            <div
              key={i}
              style={{
                padding: "6px",
                margin: "4px 0",
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              {card}
            </div>
          ))}
          
          <Popover>
            <PopoverTrigger>+ create ticket</PopoverTrigger>
            <PopoverContent>
              <div className="flex">
                <label>Title</label>
                <input type="text" style={{marginLeft:'10px'}}/>
              </div>
              <div className="flex">
                <label>Description</label>
                <input type="text" style={{marginLeft:'10px'}}/>
              </div>
              <div className="flex">
                <label>Reporter</label>
                <input type="text" style={{marginLeft:'10px'}}/>
              </div>
              <div className="flex">
                <label>Assignee</label>
                <input type="text"style={{marginLeft:'10px'}}/>
              </div>
              <div className="flex">
                <label>Story Point</label>
                <input type="text" style={{marginLeft:'10px'}}/>
              </div>
              <div className="flex">
                <label>Priority</label>
                <input type="text" style={{marginLeft:'10px'}}/>
              </div>
              <div className="flex">
                <label>Type</label>
                <input type="text" style={{marginLeft:'10px'}}/>
              </div>
              <div className="flex justify-end"><Button>Create</Button></div>
            </PopoverContent>  
          </Popover>
        </div>
      ))}
      <button onClick={addLane} style={{ height: "40px" }}>
        + Add Lane
      </button>
    </div>
  );
};

export default ProjectStructure;

import { userStore } from "@/store";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const userInfo = userStore.getState().userInfo;
    console.log(userInfo);

    const projectEntries = userInfo?.projectData
        ? Object.entries(userInfo.projectData)
        : [];
    const navigate = useNavigate();
    return (
       
        <div style={{ width: '100%', margin: '10px' }}>
            <h1 style={{ fontSize: '1.2rem' }}>Your Work</h1>
            <hr style={{ borderTopWidth: '2px', margin: '10px', marginLeft: '0px' }} />
            <h3>Recent Projects</h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {projectEntries.length > 0 ? (
                    projectEntries.slice(0, 3).map(([projectName, projectId], index) => (
                        <div onClick={() => navigate(`/project-view/${projectId}`)}
                            key={index}
                            style={{
                                border: '1px solid #ccc',
                                borderLeft:'10px solid #18181B',
                                borderRadius: '8px',
                                padding: '10px',
                                width: '200px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                backgroundColor: '#fff',
                            }}
                        >
                            <h4>{projectName}</h4>
                            <p style={{ fontSize: '0.8rem', color: '#555' }}>
                                ID: {projectId}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No projects found.</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;

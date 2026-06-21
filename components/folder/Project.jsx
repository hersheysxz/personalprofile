import Folder from "../components/Folder";

export default function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
        <span>Portfolio</span>
        <h2>Featured Projects</h2>
        <p>
          A collection of systems, mobile applications, and web projects
          developed throughout my Computer Science journey since 2023.
        </p>
      </div>

      <div className="folder-grid">

        <div className="project-folder">
          <Folder
            size={2.5}
            color="#5227FF"
            items={[
              <div className="folder-paper">
                <h3>EduByte</h3>
                <p>Educational Mobile Application</p>
              </div>,
              <div className="folder-paper">
                <h3>Dart</h3>
                <p>Flutter Development</p>
              </div>,
              <div className="folder-paper">
                <h3>MongoDB</h3>
                <p>Cloud Database</p>
              </div>
            ]}
          />
        </div>

        <div className="project-folder">
          <Folder
            size={2.5}
            color="#FF9FFC"
            items={[
              <div className="folder-paper">
                <h3>FireGuard</h3>
                <p>Emergency Mobile App</p>
              </div>,
              <div className="folder-paper">
                <h3>Android</h3>
                <p>Mobile Computing</p>
              </div>,
              <div className="folder-paper">
                <h3>UI/UX</h3>
                <p>Modern Interface</p>
              </div>
            ]}
          />
        </div>

        <div className="project-folder">
          <Folder
            size={2.5}
            color="#B497CF"
            items={[
              <div className="folder-paper">
                <h3>SK RIS</h3>
                <p>Resident Information System</p>
              </div>,
              <div className="folder-paper">
                <h3>MySQL</h3>
                <p>Database Management</p>
              </div>,
              <div className="folder-paper">
                <h3>PHP</h3>
                <p>Backend Development</p>
              </div>
            ]}
          />
        </div>

        <div className="project-folder">
          <Folder
            size={2.5}
            color="#7c63e4"
            items={[
              <div className="folder-paper">
                <h3>Portfolio</h3>
                <p>Full Stack Website</p>
              </div>,
              <div className="folder-paper">
                <h3>React</h3>
                <p>Frontend Framework</p>
              </div>,
              <div className="folder-paper">
                <h3>Vercel</h3>
                <p>Deployment</p>
              </div>
            ]}
          />
        </div>

      </div>
    </section>
  );
}
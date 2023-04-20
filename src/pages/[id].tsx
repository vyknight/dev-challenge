import { GetStaticPaths, GetStaticProps } from "next";
import { Project } from "../types";
import { useRouter } from "next/router";
import dbquery from "../lib/db";

type Props = {
    project: Project;
}

export default function ProjectPage({ project }: Props) {
    const router = useRouter();
    const q_project_id = router.query.project_id;

    return (
        <div>
            <h1>{project.project_name}</h1>
            <p>Founder: {project.project_founder}</p>
            <p>Description: {project.project_description}</p>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    // fetch project ids from database
    const res = await dbquery("SELECT project_id FROM projects;")
    const projectIds : Project[] = res.rows;
    // const projectIds = await fetchProjectIds();

    // map project ids to param objects
    const paths = projectIds.map((id) => ({ params: {id: id.toString() } }));

    return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // Extract project ID from params object
    // const projectId = Number(params?.project_id);
    const projectId = Number(params?.id);
    // Fetch project data from database using project ID 
    const project = await dbquery("SELECT project_id, project_name, project_description, project_founder FROM projects WHERE project_id = $1;", [projectId]);
    return { props: { project } };
};

// async function fetchProjectIds() {
//     const response = await fetch("/api/projects");
//     const projects = await response.json();
//     return projects.map((project) => project.project_id);
// }

// async function fetchProjectById(projectId: number) {
//     const response = await fetch(`/api/projects/${projectId}`);
//     return await response.json();
// }
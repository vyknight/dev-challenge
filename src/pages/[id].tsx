import { GetStaticPaths, GetStaticProps } from "next";

type Project = {
    project_id: string,
    project_name: string,
    project_description: string,
    project_founder: string,
}

type Props = {
    project: Project;
}

export default function ProjectPage({ project }: Props) {
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
    const projectIds = await fetchProjectIds();

    // map project ids to param objects
    const paths = projectIds.map((id) => ({ params: {id: id.toString() } }));

    return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // Extract project ID from params object
    const projectId = Number(params?.project_id);
    // Fetch project data from database using project ID 
    const project = await fetchProjectById(projectId);
    return { props: { project } };
};

async function fetchProjectIds() {
    const response = await fetch("/api/projects");
    const projects = await response.json();
    return projects.map((project) => project.project_id);
}

async function fetchProjectById(projectId: number) {
    const response = await fetch(`/api/projects/${projectId}`);
    return await response.json();
}
import { GetStaticPaths, GetStaticProps } from "next";
import { Project } from "../types";
import dbquery from "../lib/db";

type Props = {
    project: Project;
}

export default function ProjectPage({ project }) {

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
    const res = await dbquery("SELECT project_id, project_name, project_description, project_founder FROM projects;")
        .catch((err) => console.error("Error executing query"));
    const projectIds : Project[] = res.rows;

    // map project ids to param objects
    const paths = projectIds.map((project) => ({
        params: { project_id: project.project_id.toString()},
    }))

    return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // Extract project ID from params object
    // Fetch project data from database using project ID 
    const res = await dbquery("SELECT project_id, project_name, project_description, project_founder FROM projects WHERE project_id = $1;", [params.project_id.toString()]);
    const project : Project = res.rows[0];
    console.log(project)
    return { props: { project, } };
};

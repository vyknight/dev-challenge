import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Project } from '../types';
import dbquery from '../lib/db';

type Props = {
    projects: Project[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    // get project data 
    const result = await dbquery("SELECT project_id, project_name, project_description, project_founder FROM projects;")
        .catch((err) => console.error("Error executing query"));
    const projects = result.rows;

    return { props: { projects } };
};

export default function Home({ projects }) {
    return (
        <main>
            <h1>Projects</h1>
            <table>
                <thead>
                    <tr>
                    <th>Project Name</th>
                    <th>Project Page URL</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.project_id}>
                            <td>{project.project_name}</td>
                            <td>
                                <Link href={`/${project.project_id}`}>
                                    <p>website.com/{project.project_id}</p>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
;}

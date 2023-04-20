import type { NextApiRequest, NextApiResponse } from 'next'
import dbquery from '@/lib/db';
import { Project } from '../../../types';

// send query to get result
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Project | Project[]>
) {
    const { method, query, body } = req;

    // get all projects 
    if (method == 'GET' && !query.projectId) {
        const result = await dbquery("SELECT project_id, project_name, project_description, project_founder FROM projects;")
            .catch((err) => console.error("Error executing query", err.stack));
        const projects: Project[] = result.rows;

        return res.status(200).json(projects);
    }

    // get project by id 
    if (method == 'GET' && query.projectId) {
        const result = await dbquery(`SELECT project_id, project_name, project_description, project_founder FROM projects WHERE project_id = ${query.projectId};`)
            .catch((err) => console.error("Error executing query", err.stack));
        const project: Project = result.rows[0];
        return res.status(200).json(project);
    }
    
    // not goign to handle unsupported methods because this challenge is very specific 
}
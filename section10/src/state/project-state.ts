import { Project, ProjectStatus } from "../models/project.js"

// Project State Management
type Listener<T> = (items: T[]) => void


// State
class State<T> {
    protected listeners: Listener<T>[] = []

    constructor() { }

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn)
    }
}

// ProjectState
export class ProjectState extends State<Project> {
    private projects: Project[] = []
    private static instance: ProjectState

    private constructor() {
        super()
    }

    static getInstance() {
        if (this.instance) return this.instance
        this.instance = new ProjectState()
        return this.instance
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active)

        this.projects.push(newProject)
        this.updateListeners()
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(project => project.id === projectId)
        if (project && project.status !== newStatus) {
            project.status = newStatus
            this.updateListeners()
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice())
        }
    }
}

// Instantiate state for later usage:
export const projectState = ProjectState.getInstance()
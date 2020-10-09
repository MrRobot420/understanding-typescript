/// <reference path="base-components.ts" />

namespace App {
     // ProjectInput Class
     export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
        titleInputElement: HTMLInputElement
        descriptionElement: HTMLInputElement
        peopleInputElement: HTMLInputElement

        constructor() {
            super('project-input', 'app', true, 'user-input')
            this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
            this.descriptionElement = this.element.querySelector('#description') as HTMLInputElement
            this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement

            this.configure()
        }

        configure() {
            this.element.addEventListener('submit', this.submitHandler)
        }

        renderContent() { }

        private gatherUserInput(): [string, string, number] | void {
            const enteredTitle = this.titleInputElement.value
            const enteredDescription = this.descriptionElement.value
            const enteredPeople = this.peopleInputElement.value

            const titleValidatable: Validatable = { value: enteredTitle, required: true }
            const descValidatable: Validatable = { value: enteredDescription, required: true, minLength: 5 }
            const peopleValidatable: Validatable = { value: +enteredPeople, required: true, min: 1, max: 5 }

            if (!validate(titleValidatable) || !validate(descValidatable) || !validate(peopleValidatable)) {
                alert('Invalid input, please try again!')
                return
            } else {
                return [enteredTitle, enteredDescription, +enteredPeople]
            }
        }

        @autobind
        private submitHandler(event: Event) {
            event.preventDefault()
            const userInput = this.gatherUserInput()
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput
                projectState.addProject(...userInput)
                console.log(title, desc, people)
                this.clearInputs()
            }
        }

        private clearInputs() {
            this.titleInputElement.value = ''
            this.descriptionElement.value = ''
            this.peopleInputElement.value = ''
        }
    }
}
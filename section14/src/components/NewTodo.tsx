import React, { useRef } from 'react';

interface NewTodoProps {
    onAddTodo: (todoText: string) => void
}

const NewTodo: React.FC<NewTodoProps> = props => {
    const textinputRef = useRef<HTMLInputElement>(null)

    const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        const enteredText = textinputRef.current!.value
        props.onAddTodo(enteredText)
    }

    return <form onSubmit={todoSubmitHandler}>
        <div>
            <label htmlFor="todo-text">Todo Text</label>
            <input type="text" id="todo-text" ref={textinputRef}/>
        </div>
        <button type="submit">ADD TODO</button>
    </form>
}

export default NewTodo
import React, { useRef } from 'react';

const NewTodo: React.FC = () => {
    const textinputRef = useRef<HTMLInputElement>(null)

    const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        const enteredText = textinputRef.current!.value
        console.log(enteredText)
        
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
let todos = ["Buy New Turtle","Go Home","Play Soccer"]

let input = prompt('What would you like to do?') 

const listTodos = () => {
    todos.forEach((todo, index) => {
    console.log('**********')
    console.log(`${index + 1}: ${todo}`)
    console.log('**********')
        })
}

const addTodo = () => {
    const newTodo = prompt('Enter new todo')
    todos.push(newTodo)
    console.log('Added Todo')
}

const deleteTodo = () => {
    const number = prompt('Enter number of todo to delete')
    todos.splice(number - 1,1)
    console.log('Deleted Todo')
}

while(input.toLowerCase() !== 'quit') {
    if(input.toLowerCase() === 'list'){
        listTodos()
    } else if (input.toLowerCase() === 'new'){
        addTodo()
    } else if (input.toLowerCase() === 'delete'){
        deleteTodo()
    }
    
    input = prompt("What would you like to do?")
}
console.log('OK, YOU QUIT THE APP')


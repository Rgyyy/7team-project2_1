import TodoList from './TodoList';

async function getTodos() {
  return [
    { id: 1, text: 'Hello, Next.js', completed: false },
    { id: 2, text: '서버 컴포넌트 만들기', completed: true },
    { id: 3, text: '클라이언트 컴포넌트 만들기', completed: false },
  ];
}

export default async function TodoPage() {
  const todos = await getTodos();

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6"></h1>
      <TodoList initTodos={todos} />
    </div>
  );
}

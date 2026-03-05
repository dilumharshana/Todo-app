import { useState } from 'react';
import { TodoProvider } from '../../context/TodoContext';
import { useTodo } from '../../customHooks/useTodo';
import { TodoAppHeader } from '../../components/todoAppHeader/TodoAppHeader';
import { TodoListContainer } from '../../components/todoListContainer/TodoListContainer';
import Modal from '../../components/modal/Modal';
import { TodoForm } from '../../components/todoForm/TodoForm';

const MainLayoutContent = () => {
    const { todos, openEditModal } = useTodo(); // We'll use our new hook
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);

    const openCreateModal = () => {
        setEditingTodo(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTodo(null);
    };

    return (
        <div className="max-w-2xl mx-auto m-6">
            <TodoAppHeader numberOfTodos={todos.length} onAddClick={openCreateModal} />
            <TodoListContainer onEdit={openEditModal} openCreateModal={openCreateModal} />

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingTodo ? 'Update Task' : 'New Task'}
            >
                <TodoForm
                    onCancel={closeModal}
                    initialData={editingTodo}
                />
            </Modal>
        </div>
    );
};

export const MainLayout = () => (
    <TodoProvider>
        <MainLayoutContent />
    </TodoProvider>
);




import { useState } from 'react';
import Modal from '../../components/modal/Modal';
import { TodoAppHeader } from '../../components/todoAppHeader/TodoAppHeader';
import { TodoForm } from '../../components/todoForm/TodoForm';
import { TodoListContainer } from '../../components/todoListContainer/TodoListContainer';
import { TodoProvider } from '../../context/TodoContext';
import { Toaster } from 'react-hot-toast';

const MainLayoutContent = () => {
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);

    const openCreateModal = () => {
        setEditingTodo(null);
        setIsModalOpen(true);
    };

    const openEditModal = (todo) => {
        setEditingTodo(todo);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTodo(null);
    };

    return (
        <div className="max-w-2xl mx-auto m-6">
            <Toaster position="top-right" />
            <TodoAppHeader onAddClick={openCreateModal} />
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




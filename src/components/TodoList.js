import React, { Fragment, useState, memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeState, deleteTodo, editTodo, reorderTodo } from '../Redux/TodoSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import '../styles/Todolist.css';
import { modalStyle, buttonStyle, textfieldStyle } from '../styles/sxStyles';

const TodoItem = memo(({ todo, handleCheckBox, handleOpen }) => (
    <Draggable key={todo.id} draggableId={String(todo.id)} index={todo.index}>
        {(provided) => (
            <li
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="todo-item"
            >
                <Checkbox
                    icon={<RadioButtonUncheckedIcon sx={{ color: "#a019c2" }} />}
                    checkedIcon={<CheckCircleIcon sx={{ fill: '#a019c2' }} />}
                    checked={todo.completed}
                    onClick={() => handleCheckBox(todo.id, !todo.completed)}
                />
                <div className="todo-task">
                    <span className={todo.completed ? 'completed' : 'not-completed'}>{todo.title}</span>
                </div>
                <Button
                    sx={buttonStyle}
                    onClick={() => handleOpen(todo.id, 'edit')}
                    variant="contained"
                    disabled={todo.completed}
                    startIcon={<EditIcon />}
                />
                <Button
                    sx={buttonStyle}
                    onClick={() => handleOpen(todo.id, 'delete')}
                    variant="contained"
                    startIcon={<DeleteIcon />}
                />
            </li>
        )}
    </Draggable>
));

const TodoCount = ({ TodoList }) => {
    const activeTodos = TodoList.filter((todo) => todo.completed !== false).length;
    const totalTodos = TodoList.length;

    if (totalTodos === 0) {
        return (
            <div className='count-wrap'>
                No Todos Added!
            </div>
        );
    }

    return (
        <div className='count-wrap'>
            <span>{activeTodos}</span> Out Of <span>{totalTodos}</span> Completed
        </div>
    );
};

const Todo = () => {
    const TodoList = useSelector((state) => state.todos);
    const [todoEdit, setTodoEdit] = useState('');
    const [todoEditId, setTodoEditId] = useState(0);
    const [open, setOpen] = useState(false);
    const [deleteActive, setDeleteActive] = useState(false);
    const [isEditValid, setIsEditValid] = useState(true); // New state for input validity
    const dispatch = useDispatch();

    const handleOpen = (id, currentActivity) => {
        setOpen(true);
        setTodoEditId(id);
        setDeleteActive(currentActivity === "delete");

        // Set initial value for editing and check validity
        const todoToEdit = TodoList.find(todo => todo.id === id);
        if (todoToEdit) {
            setTodoEdit(todoToEdit.title);
            setIsEditValid(todoToEdit.title.trim().length > 0);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setDeleteActive(false);
    };

    const handleCheckBox = (id, state) => {
        dispatch(changeState({
            id: id,
            completed: state
        }));
    };

    const handleDelete = () => {
        dispatch(deleteTodo({
            id: todoEditId
        }));
        handleClose();
    };

    const handleEdit = () => {
        if (todoEdit.trim().length > 0) {
            dispatch(editTodo({
                id: todoEditId,
                title: todoEdit
            }));
            handleClose();
        }
    };

    const handleEditChange = (e) => {
        const value = e.target.value;
        setTodoEdit(value);
        setIsEditValid(value.trim().length > 0); // Update validity
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(TodoList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        dispatch(reorderTodo({
            items: items
        }));
    };

    return (
        <Fragment>
            <TodoCount TodoList={TodoList} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="todos">
                    {(provided) => (
                        <ul className="todolist" {...provided.droppableProps} ref={provided.innerRef} style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {TodoList.map((todo, index) => (
                                <TodoItem
                                    key={todo.id}
                                    todo={{ ...todo, index }}
                                    handleCheckBox={handleCheckBox}
                                    handleOpen={handleOpen}
                                />
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    {!deleteActive ? (
                        <Fragment>
                            <TextField
                                multiline
                                sx={{
                                    ...textfieldStyle,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                onChange={handleEditChange}
                                value={todoEdit}
                                id="outlined-basic"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <Button
                                            sx={buttonStyle}
                                            onClick={handleEdit}
                                            variant="contained"
                                            disabled={!isEditValid} // Disable if input is invalid
                                        >
                                            Confirm
                                        </Button>
                                    ),
                                }}
                            />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div className="deleteText">
                                <span>Are you sure?</span>
                            </div>
                            <Button
                                sx={buttonStyle}
                                onClick={handleDelete}
                                variant="contained"
                            >
                                Confirm
                            </Button>
                        </Fragment>
                    )}
                </Box>
            </Modal>
        </Fragment>
    );
};

export default Todo;

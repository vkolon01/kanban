import React from 'react';
import KanbanBoard from './KanbanBoard';
import './App.css';

export let cardsList = [
    {
        id: 1,
        title: 'Read the book',
        description: 'I should read the **whole** book',
        status: 'in-progress',
        tasks: [
            {
                id:1,
                name: 'Im sad',
                done:true
            }
        ]
    },
    {
        id: 2,
        title: 'Write some code',
        description: 'Code along with the samples in the book',
        status: 'todo',
        tasks: [
            {
                id: 1,
                name: 'ContactList Example',
                done: true
            },
            {
                id: 2,
                name: 'Kanban Example',
                done: false
            },
            {
                id: 3,
                name: 'My own experiments',
                done: false
            }
        ]
    }
];
export default KanbanBoard;

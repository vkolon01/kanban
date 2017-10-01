import React from 'react';
import KanbanBoard from './KanbanBoard';
import './App.css';

export let cardsList = [
    {
        id: 1,
        title: 'Read the bookRead the bookRead the bookRead the bookRead the bookRead the bookRead the bookRead the bookRead the bookRead the bookRead the bookRead the bookRead the bookRead the bookRead the bookRead the bookRead the book',
        description: 'I should read the **whole** book',
        color: '#bd8d31',
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
        id: 3,
        title: 'Experiment',
        description: 'Bad boys,',
        color: 'red',
        status: 'in-progress',
        tasks: [
            {
                id:1,
                name: 'bad boys,',
                done:true
            },
            {
                id:12,
                name: 'whacha gonna do?',
                done:true
            }
        ]
    },
    {
        id: 2,
        title: 'Write some code',
        description: 'Code along with the samples in the book. The complete source can be found' +
        'at [github](https://github.com/pro-react)',
        color: '#3a7e28',
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

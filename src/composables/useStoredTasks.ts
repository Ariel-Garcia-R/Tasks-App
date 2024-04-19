export const useStoredTasks = () => {
    // const localStorageContent =  localStorage.getItem('tasks')
    // if (localStorageContent) return JSON.parse(localStorageContent)    
    // return []
    return ([
        {
            id: '1',
            title: 'Tarea 1',
            body: 'Este es el cuerpo de la tarea 1.',
            formattedBody: 'Este es el cuerpo formateado de la tarea 1.',
            isCompleted: false,
         },
         {
            id: '2',
            title: 'Tarea 2',
            body: 'Este es el cuerpo de la tarea 2.',
            formattedBody: 'Este es el cuerpo formateado de la tarea 2.',
            isCompleted: true,
         },
         {
            id: '3',
            title: 'Tarea 3',
            body: 'Este es el cuerpo de la tarea 3.',
            formattedBody: 'Este es el cuerpo formateado de la tarea 3.',
            isCompleted: false,
         },
         {
            id: '4',
            title: 'Tarea 4',
            body: 'Este es el cuerpo de la tarea 4.',
            formattedBody: 'Este es el cuerpo formateado de la tarea 4.',
            isCompleted: true,
         },
         {
            id: '5',
            title: 'Tarea 5',
            body: 'Este es el cuerpo de la tarea 5.',
            formattedBody: 'Este es el cuerpo formateado de la tarea 5.',
            isCompleted: false,
         },
    ])
 }  
export const useStoredTasks = () => {
    const localStorageContent =  localStorage.getItem('tasks')
    if (localStorageContent) return JSON.parse(localStorageContent)    
    return []
 }  
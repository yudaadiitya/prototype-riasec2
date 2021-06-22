const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      content: 'Saya senang berekspresi melalui logika analisis',
      label: 'Paling Sesuai',
    },
    'task-2': {
      id: 'task-2',
      content: 'Saya menyukai pekerjaan yang terkait konstruksi sebuah objek',
      label: 'Sesuai',
    },
    'task-3': {
      id: 'task-3',
      content:
        'Saya dapat memberikan makna yang berbeda dari orang kebanyakan terhadap sebuah karya seni',
      label: 'Agak Sesuai',
    },
    'task-4': {
      id: 'task-4',
      content: 'Membantu orang lain adalah semacam panggilan jiwa bagi saya',
      label: 'Agak tidak Sesuai',
    },
    'task-5': {
      id: 'task-5',
      content: 'Berbisnis adalah hal yang tidak asing bagi saya',
      label: 'Tidak Sesuai',
    },
    'task-6': {
      id: 'task-6',
      content:
        'Saya adalah orang yang memperhatikan setiap langkah-langkah dalam pekerjaan',
      label: 'Paling tidak Sesuai',
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },

    'column-4': {
      id: 'column-4',
      title: 'Done',
      taskIds: [],
    },
    'column-5': {
      id: 'column-5',
      title: 'Done',
      taskIds: [],
    },
    'column-6': {
      id: 'column-6',
      title: 'Done',
      taskIds: [],
    },
    'column-7': {
      id: 'column-7',
      title: 'Done',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5', 'task-6'],
    },
  },
  option: {
    0: 'Sangat sesuai',
    1: '|',
    2: '|',
    3: '|',
    4: '|',
    5: 'Sangat tidak sesuai',
  },
  // Facilitate reordering of the columns
  columnOrder: [
    'column-1',
    'column-2',
    'column-3',
    'column-4',
    'column-5',
    'column-6',
    'column-7',
  ],
};

export default initialData;

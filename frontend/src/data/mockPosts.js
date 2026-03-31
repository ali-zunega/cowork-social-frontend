export const mockPosts = [
  {
    id: 1,
    author: { name: "María González", avatar: null },
    content:
      "¡Acabo de terminar mi primer proyecto en React! 🎉 Fue todo un desafío pero aprendí muchísimo en el camino. ¿Algún consejo para optimizar el rendimiento?",
    createdAt: new Date().toISOString(),
    likes: 24,
    comments: 5,
  },
  {
    id: 2,
    author: { name: "Carlos Ruiz", avatar: null },
    content:
      "Compartiendo mi experiencia con GraphQL. Las queries son increíblemente eficientes comparadas con REST. ¿Alguien más lo está usando?",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    likes: 18,
    comments: 12,
  },
  {
    id: 3,
    author: { name: "Ana Martínez", avatar: null },
    content:
      "Busco colaboradores para un proyecto open source de gestión de tareas. ¿Alguien interesado? stack: Node.js + MongoDB + React",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    likes: 45,
    comments: 23,
  },
];

export const formatTimeAgo = (date) => {
  const diff = Math.floor((new Date() - new Date(date)) / 1000);

  if (diff < 60) return "ahora";

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `hace ${minutes} min`;

  const hours = Math.floor(diff / 3600);
  if (hours < 24) return `hace ${hours} h`;

  // Si pasó más de un día, mostramos la fecha local
  return new Date(date).toLocaleDateString("es-AR");
};

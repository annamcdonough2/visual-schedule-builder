const STORAGE_KEY = 'kids_routines_v1';
const MAX_ROUTINES = 2;

export function getSavedRoutines() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveRoutine(routine) {
  const routines = getSavedRoutines();
  if (routines.length >= MAX_ROUTINES) {
    return { success: false, reason: 'limit' };
  }
  const newRoutine = {
    id: `saved-${Date.now()}`,
    title: routine.title,
    steps: routine.steps,
    savedAt: Date.now(),
  };
  routines.push(newRoutine);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(routines));
  return { success: true, routine: newRoutine };
}

export function deleteRoutine(id) {
  const routines = getSavedRoutines().filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(routines));
}

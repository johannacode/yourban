export interface Movie {
  id: number
  titre: string
  date_sortie: string
  genre: string | null        
  recettes_totales: number
  nombre_entrees: number
  pays_origine: string
  distributeur: string
  duree_minutes: number
  note_presse: number | null  
}

// Partie création de film (exclusion de l'id car il est généré automatiquement)
export type CreateMovieDto = Omit<Movie, 'id'>

// Partie modification (Tout est optionnel, sauf l'id)
export type UpdateMovieDto = Partial<Omit<Movie, 'id'>>
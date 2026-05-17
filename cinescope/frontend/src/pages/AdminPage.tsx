import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Movie } from '../../../shared/types/movie'
import { moviesService } from '../services/movies.service'
import { Navbar } from '../components/NavBar'

const EMPTY_FORM = {
  titre: '', genre: '', genre_custom: '', date_sortie: '', pays_origine: '',
  distributeur: '', recettes_totales: '', nombre_entrees: '',
  duree_minutes: '', note_presse: ''
}

const GENRES_DEFAUT = [
  'Action', 'Aventure', 'Comédie', 'Drame', 'Fantaisie',
  'Horreur', 'Romance', 'Science-Fiction', 'Thriller', 'Animation', 'Autre'
]

const PAGE_SIZE = 10

export function AdminPage() {
  const navigate = useNavigate()
  const [movies, setMovies] = useState<Movie[]>([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState<number | null>(null)
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const data = await moviesService.getAll()
    setMovies(data)
  }

  function notify(text: string, ok = true) {
    setMessage({ text, ok })
    setTimeout(() => setMessage(null), 3000)
  }

  function startEdit(movie: Movie) {
    setEditId(movie.id)
    const genreExiste = GENRES_DEFAUT.includes(movie.genre ?? '')
    setForm({
      titre: movie.titre,
      genre: genreExiste ? (movie.genre ?? '') : 'Autre',
      genre_custom: genreExiste ? '' : (movie.genre ?? ''),
      date_sortie: movie.date_sortie,
      pays_origine: movie.pays_origine,
      distributeur: movie.distributeur,
      recettes_totales: movie.recettes_totales?.toString() ?? '',
      nombre_entrees: movie.nombre_entrees?.toString() ?? '',
      duree_minutes: movie.duree_minutes?.toString() ?? '',
      note_presse: movie.note_presse?.toString() ?? ''
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelEdit() {
    setEditId(null)
    setForm(EMPTY_FORM)
  }

  async function handleSubmit() {
    // Si "Autre" est sélectionné, on utilise le champ libre
    const genreFinale = form.genre === 'Autre'
      ? (form.genre_custom || null)
      : (form.genre || null)

    const note = form.note_presse ? Number(form.note_presse) : null
    if (note !== null && (note < 0 || note > 10)) {
      notify('La note presse doit être entre 0 et 10', false)
      return
    }

    const payload = {
      titre: form.titre,
      genre: genreFinale,
      date_sortie: form.date_sortie,
      pays_origine: form.pays_origine,
      distributeur: form.distributeur,
      recettes_totales: form.recettes_totales ? Number(form.recettes_totales) : null,
      nombre_entrees: form.nombre_entrees ? Number(form.nombre_entrees) : null,
      duree_minutes: form.duree_minutes ? Number(form.duree_minutes) : null,
      note_presse: note
    }

    try {
      if (editId !== null) {
        await moviesService.update(editId, payload)
        notify('Film modifié avec succès')
      } else {
        await moviesService.create(payload)
        notify('Film créé avec succès')
      }
      setForm(EMPTY_FORM)
      setEditId(null)
      load()
    } catch {
      notify('Erreur lors de la sauvegarde', false)
    }
  }

  async function handleDelete(id: number) {
    setDeleteId(id)
  }

  async function confirmDelete() {
    if (deleteId === null) return

    try {
        await moviesService.delete(deleteId)
        notify('Film supprimé')
        load()
    } catch {
        notify('Erreur lors de la suppression', false)
    } finally {
        setDeleteId(null)
    }
  }

  const filteredMovies = movies.filter(movie =>
    movie.titre.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredMovies.length / PAGE_SIZE)
  const paginated = filteredMovies.slice( (page - 1) * PAGE_SIZE, page * PAGE_SIZE )

  return (
    <>
      <Navbar />

      <div className="admin-page">
        <div className="admin-header">
          <h1>Administration</h1>
        </div>
        <div><button className="detail-back-btn" onClick={() => navigate('/')}>← Retour</button></div>
    
        {message && (
          <div className={`admin-message ${message.ok ? 'admin-message--ok' : 'admin-message--err'}`}>
            {message.text}
          </div>
        )}

        {/* Formulaire */}
        <div className="admin-form-card">
          <h2>{editId !== null ? 'Modifier le film' : 'Ajouter un film'}</h2>
          <div className="admin-form-grid">

            {/* Titre */}
            <div className="admin-field">
              <label>Titre *</label>
              <input
                type="text"
                value={form.titre}
                onChange={e => setForm(f => ({ ...f, titre: e.target.value }))}
                placeholder="Titre du film"
              />
            </div>

            {/* Genre (select + champ libre si "Autre") */}
            <div className="admin-field">
              <label>Genre</label>
              <select
                value={form.genre}
                onChange={e => setForm(f => ({ ...f, genre: e.target.value, genre_custom: '' }))}
                className="admin-select"
              >
                <option value="">— Aucun —</option>
                {GENRES_DEFAUT.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              {form.genre === 'Autre' && (
                <input
                  type="text"
                  value={form.genre_custom}
                  onChange={e => setForm(f => ({ ...f, genre_custom: e.target.value }))}
                  placeholder="Précisez le genre"
                  style={{ marginTop: '0.4rem' }}
                />
              )}
            </div>

            {/* Date */}
            <div className="admin-field">
              <label>Date de sortie *</label>
              <input
                type="date"
                value={form.date_sortie}
                onChange={e => setForm(f => ({ ...f, date_sortie: e.target.value }))}
              />
            </div>

            {/* Pays */}
            <div className="admin-field">
              <label>Pays *</label>
              <input
                type="text"
                value={form.pays_origine}
                onChange={e => setForm(f => ({ ...f, pays_origine: e.target.value }))}
                placeholder="Pays d'origine"
              />
            </div>

            {/* Distributeur */}
            <div className="admin-field">
              <label>Distributeur *</label>
              <input
                type="text"
                value={form.distributeur}
                onChange={e => setForm(f => ({ ...f, distributeur: e.target.value }))}
                placeholder="Distributeur"
              />
            </div>

            {/* Recettes */}
            <div className="admin-field">
              <label>Recettes ($)</label>
              <input
                type="number"
                min="0"
                value={form.recettes_totales}
                onChange={e => setForm(f => ({ ...f, recettes_totales: e.target.value }))}
                placeholder="ex: 15000000"
              />
            </div>

            {/* Entrées */}
            <div className="admin-field">
              <label>Entrées</label>
              <input
                type="number"
                min="0"
                value={form.nombre_entrees}
                onChange={e => setForm(f => ({ ...f, nombre_entrees: e.target.value }))}
                placeholder="ex: 1200000"
              />
            </div>

            {/* Durée */}
            <div className="admin-field">
              <label>Durée (min)</label>
              <input
                type="number"
                min="1"
                value={form.duree_minutes}
                onChange={e => setForm(f => ({ ...f, duree_minutes: e.target.value }))}
                placeholder="ex: 110"
              />
            </div>

            {/* Note presse (bloquée entre 0 et 10) */}
            <div className="admin-field">
              <label>Note presse (0 – 10)</label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={form.note_presse}
                onChange={e => setForm(f => ({ ...f, note_presse: e.target.value }))}
                placeholder="ex: 7.5"
              />
            </div>

          </div>
          <div className="legend">
            <p>Les champs avec un (*) sont obligatoires, mais pour plus de fiabilité, merci de remplir tous les champs.<br /></p>
          </div>

          <div className="admin-form-actions">
            <button className="admin-btn admin-btn--primary" onClick={handleSubmit}>
              {editId !== null ? 'Enregistrer' : 'Créer'}
            </button>
            {editId !== null && (
              <button className="admin-btn admin-btn--ghost" onClick={cancelEdit}>
                Annuler
              </button>
            )}
          </div>
        </div>

        {/* Liste avec pagination */}
        <div className="admin-list">
          <h2>{filteredMovies.length} films</h2>
          <div className="admin-search">
            <input
                type="text"
                placeholder="Rechercher un film..."
                value={search}
                onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
                }}
            />
          </div>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Titre</th>
                  <th>Genre</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map(m => (
                  <tr key={m.id}>
                    <td>{m.id}</td>
                    <td className="admin-table-titre">{m.titre}</td>
                    <td>{m.genre ?? '—'}</td>
                    <td>{m.date_sortie}</td>
                    <td>
                      <button className="admin-btn admin-btn--sm" onClick={() => startEdit(m)}>
                        Modifier
                      </button>
                      <button
                        className="admin-btn admin-btn--sm admin-btn--danger"
                        onClick={() => handleDelete(m.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination simple */}
          {totalPages > 1 && (
            <div className="pagination" style={{ marginTop: '1.5rem' }}>
              <button
                className="pagination-btn"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >←</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  className={`pagination-btn ${p === page ? 'pagination-btn--active' : ''}`}
                  onClick={() => setPage(p)}
                >{p}</button>
              ))}
              <button
                className="pagination-btn"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >→</button>
            </div>
          )}
        </div>
      </div>
      {deleteId !== null && (
        <div
            className="modal-overlay"
            onClick={() => setDeleteId(null)}
        >
            <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            >
            <h3>Confirmation</h3>
            <p>Voulez-vous vraiment supprimer ce film ?</p>

            <div className="modal-actions">
                <button
                className="admin-btn admin-btn--ghost"
                onClick={() => setDeleteId(null)}
                >
                Annuler
                </button>

                <button
                className="admin-btn admin-btn--danger"
                onClick={confirmDelete}
                >
                Supprimer
                </button>
            </div>
            </div>
        </div>
      )}
    </>
  )
}
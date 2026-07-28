import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { componentRegistry } from './component-registry'

export default function Sidebar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { name } = useParams()

  const filtered = componentRegistry.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">@g44/ui-kit</h2>
      </div>
      <input
        type="text"
        placeholder="Search components..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="sidebar-search"
      />
      <nav className="sidebar-nav">
        {filtered.map((c) => (
          <button
            key={c.name}
            onClick={() => navigate(`/component/${c.name.toLowerCase()}`)}
            className={`sidebar-item ${c.name.toLowerCase() === name?.toLowerCase() ? 'active' : ''}`}
          >
            {c.name}
          </button>
        ))}
      </nav>
    </aside>
  )
}

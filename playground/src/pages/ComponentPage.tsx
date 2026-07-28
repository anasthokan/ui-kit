import type { ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { componentRegistry } from '../component-registry'

function RenderSlot({ fn }: { fn: () => ReactNode }) {
  return <>{fn()}</>
}

export default function ComponentPage() {
  const { name } = useParams<{ name: string }>()

  const entry = componentRegistry.find(
    (c) => c.name.toLowerCase() === name?.toLowerCase(),
  )

  if (!entry) {
    return (
      <div className="content-empty">
        <h1>Component not found</h1>
        <p>Select a component from the sidebar.</p>
      </div>
    )
  }

  return (
    <div className="content">
      <h1 className="content-title">{entry.name}</h1>
      <p className="content-desc">{entry.description}</p>

      <section className="section">
        <h2 className="section-title">Default MUI Version</h2>
        <div className="demo-box">
          <RenderSlot fn={entry.muiDefaultRender} />
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Variants</h2>
        <div className="examples-list">
          {entry.examples.map((example, i) => (
            <div key={`${entry.name}-${i}`} className="example-block">
              <h3>{example.label}</h3>
              {example.description && (
                <p className="example-desc">{example.description}</p>
              )}
              <div className="example-preview">
                <RenderSlot fn={example.render} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

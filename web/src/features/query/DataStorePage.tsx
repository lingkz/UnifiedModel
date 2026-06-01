import { useState } from 'react'
import { Play, Route } from 'lucide-react'
import type { QueryResult } from '../../api/types'
import { UModelApi } from '../../api/client'
import { Badge, Button, Field, Panel, Tabs, TextInput } from '../../design/components'
import { useI18n } from '../../i18n'
import { formatError } from '../../lib/json'
import { ResultTable } from './QueryPage'

type DataMode = 'entity' | 'topo'

export function DataStorePage({ api, workspaceId }: { api: UModelApi; workspaceId: string }) {
  const { t } = useI18n()
  const [mode, setMode] = useState<DataMode>('entity')
  const [domain, setDomain] = useState('devops')
  const [name, setName] = useState('devops.service')
  const [queryText, setQueryText] = useState('checkout')
  const [seed, setSeed] = useState('10000000000000000000000000000101')
  const [result, setResult] = useState<QueryResult | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function run() {
    setBusy(true)
    setError('')
    try {
      const spl = mode === 'entity'
        ? `.entity with(domain='${escapeSPL(domain)}', name='${escapeSPL(name)}', query='${escapeSPL(queryText)}', topk=50) | limit 50`
        : `.topo | graph-call getDirectRelations([(:\"devops@devops.service\" {__entity_id__: '${escapeSPL(seed)}'})]) | limit 50`
      setResult(await api.query(workspaceId, { query: spl, limit: 50 }))
    } catch (nextError) {
      setError(formatError(nextError))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="page-grid">
      <Panel
        title={<strong>{t('query.data.title')}</strong>}
        action={
          <Button variant="primary" disabled={busy} onClick={() => void run()}>
            <Play size={15} />
            {t('query.action.execute')}
          </Button>
        }
      >
        <div className="stack">
          <Tabs
            value={mode}
            onChange={setMode}
            items={[
              { value: 'entity', label: t('query.data.entities'), icon: <Route size={14} /> },
              { value: 'topo', label: t('query.data.topology'), icon: <Route size={14} /> },
            ]}
          />
          {mode === 'entity' ? (
            <div className="row" style={{ alignItems: 'end' }}>
              <div style={{ width: 160 }}>
                <Field label={t('query.data.domain')}>
                  <TextInput value={domain} onChange={(event) => setDomain(event.target.value)} />
                </Field>
              </div>
              <div style={{ width: 220 }}>
                <Field label={t('query.data.entitySet')}>
                  <TextInput value={name} onChange={(event) => setName(event.target.value)} />
                </Field>
              </div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <Field label={t('query.data.search')}>
                  <TextInput value={queryText} onChange={(event) => setQueryText(event.target.value)} />
                </Field>
              </div>
            </div>
          ) : (
            <Field label={t('query.data.seedEntityId')}>
              <TextInput value={seed} onChange={(event) => setSeed(event.target.value)} />
            </Field>
          )}
          {error && <Badge tone="danger">{error}</Badge>}
        </div>
      </Panel>
      <Panel title={<strong>{t('query.result.title')}</strong>} action={result && <Badge>{result.rows.length}</Badge>}>
        {result ? <ResultTable result={result} /> : <div className="muted">{t('query.result.empty.title')}</div>}
      </Panel>
    </div>
  )
}

function escapeSPL(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

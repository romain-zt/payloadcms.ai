import React from 'react'

export function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n')
  const nodes: React.ReactNode[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? ''

    if (line.startsWith('### ')) {
      nodes.push(
        <strong key={i} className="block mt-3 mb-1 text-xs font-semibold text-zinc-200">
          {renderInline(line.slice(4))}
        </strong>,
      )
    } else if (line.startsWith('## ')) {
      nodes.push(
        <strong key={i} className="block mt-3 mb-1 text-sm font-semibold text-zinc-200">
          {renderInline(line.slice(3))}
        </strong>,
      )
    } else if (/^[-*] /.test(line)) {
      nodes.push(
        <div key={i} className="pl-3 my-0.5 text-zinc-300">
          {'• '}
          {renderInline(line.replace(/^[-*] /, ''))}
        </div>,
      )
    } else if (/^\d+\. /.test(line)) {
      const match = line.match(/^(\d+)\. (.*)/)
      if (match) {
        nodes.push(
          <div key={i} className="pl-3 my-0.5 text-zinc-300">
            {match[1]}. {renderInline(match[2] ?? '')}
          </div>,
        )
      }
    } else if (line.startsWith('```')) {
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i]?.startsWith('```')) {
        codeLines.push(lines[i] ?? '')
        i++
      }
      nodes.push(
        <pre
          key={`code-${i}`}
          className="my-2 rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs overflow-x-auto text-zinc-300"
        >
          <code>{codeLines.join('\n')}</code>
        </pre>,
      )
    } else if (line.trim() === '') {
      nodes.push(<div key={i} className="h-1.5" />)
    } else {
      nodes.push(
        <div key={i} className="my-0.5 text-zinc-300">
          {renderInline(line)}
        </div>,
      )
    }
  }

  return nodes
}

function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    if (match[1] && match[2]) {
      parts.push(
        <a
          key={`${match.index}-link`}
          href={match[2]}
          className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          {match[1]}
        </a>,
      )
    } else if (match[3]) {
      parts.push(<strong key={`${match.index}-b`} className="font-semibold text-zinc-200">{match[3]}</strong>)
    } else if (match[4]) {
      parts.push(
        <code
          key={`${match.index}-c`}
          className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-xs text-zinc-300"
        >
          {match[4]}
        </code>,
      )
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

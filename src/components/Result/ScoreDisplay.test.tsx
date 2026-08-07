import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScoreDisplay } from './ScoreDisplay'

describe('ScoreDisplay', () => {
  it('renders score with green color for score 80-100', () => {
    render(<ScoreDisplay score={85} color="green" />)
    
    expect(screen.getByText('85')).toBeInTheDocument()
    expect(screen.getByText('Score de Calidad')).toBeInTheDocument()
    expect(screen.getByText('de 1 a 100')).toBeInTheDocument()
  })

  it('renders score with yellow color for score 50-79', () => {
    render(<ScoreDisplay score={65} color="yellow" />)
    
    expect(screen.getByText('65')).toBeInTheDocument()
    expect(screen.getByText('Score de Calidad')).toBeInTheDocument()
    expect(screen.getByText('de 1 a 100')).toBeInTheDocument()
  })

  it('renders score with red color for score 1-49', () => {
    render(<ScoreDisplay score={30} color="red" />)
    
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(screen.getByText('Score de Calidad')).toBeInTheDocument()
    expect(screen.getByText('de 1 a 100')).toBeInTheDocument()
  })

  it('displays minimum score of 1', () => {
    render(<ScoreDisplay score={1} color="red" />)
    
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('displays maximum score of 100', () => {
    render(<ScoreDisplay score={100} color="green" />)
    
    expect(screen.getByText('100')).toBeInTheDocument()
  })
})

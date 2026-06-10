import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GradeSelect from '../../src/components/GradeSelect';

describe('GradeSelect Component', () => {
  it('renders all grade options', () => {
    render(<GradeSelect onSelect={vi.fn()} />);
    
    expect(screen.getByText(/Grade K/i)).toBeInTheDocument();
    expect(screen.getByText(/Grade 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Grade 5/i)).toBeInTheDocument();
  });

  it('calls onSelect when a grade is clicked', () => {
    const onSelectMock = vi.fn();
    render(<GradeSelect onSelect={onSelectMock} />);
    
    const gradeK = screen.getByText(/Grade K/i);
    fireEvent.click(gradeK);
    
    expect(onSelectMock).toHaveBeenCalledWith('K');
  });
});

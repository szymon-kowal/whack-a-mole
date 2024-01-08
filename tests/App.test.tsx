import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import React from 'react';
// import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';
import App from '../src/App';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

describe('App component', () => {
	it('Renders', () => {
		render(<App />);

		expect(screen.getByText(/Score:/)).toBeInTheDocument();
		expect(screen.getByText(/0/)).toBeInTheDocument();
	});

	it('Renders score on correct click', () => {
		const randomNumMock = vi.fn(() => 0);

		render(<App randomNumberGenerator={randomNumMock} />);

		const moleBtn = screen.getAllByRole('button')[0];

		userEvent.click(moleBtn);

		waitFor(() => expect(screen.getByText(/1/)).toBeInTheDocument());
	});

	it('Renders 0 score on wrong click', () => {
		const randomNumMock = vi.fn(() => 0);

		render(<App randomNumberGenerator={randomNumMock} />);

		const wrongMoleBtn = screen.getAllByRole('button')[1];

		userEvent.click(wrongMoleBtn);

		waitFor(() => expect(screen.getByText(/0/)).toBeInTheDocument());
	});
});

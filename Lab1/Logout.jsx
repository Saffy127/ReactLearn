import React from 'react';

function Logout({ }) {
	const handleLogout = async (e) => {
		e.preventDefault();

		// Send request to /logout API endpoint

		// Call onLogout with API message as input.

		// Parent App component needs to notified that logout has occurred.
	};

	return (
		<>
			<button onClick={handleLogout}>
				Logout
			</button>
		</>
	);
}

export default Logout;

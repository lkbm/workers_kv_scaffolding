import { useState, useEffect } from 'preact/hooks';

export default function App() {
	const currentHash = window.location.hash.slice(1) || 'default';
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [currentData, setCurrentData] = useState('');

	useEffect(() => {
		const loadData = async () => {
			try {
				const response = await fetch(`/api/state/${currentHash}`);
				if (response.ok) {
					const data: { value?: string } = await response.json();
					setCurrentData(data.value ?? '');
				}
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};
		void loadData();
	}, [currentHash]);

	const handleSave = async () => {
		setIsSaving(true);
		try {
			const response = await fetch(`/api/state/${currentHash}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ value: currentData })
			});
			if (!response.ok) {
				console.error(`Error: ${response.status}`);
			}
		} catch (err) {
			console.error('Save error', err);
		} finally {
			setIsSaving(false);
		}
	};
	if (isLoading) return <div>Loading...</div>;

	return (
		<>
			<h1>Placeholder App</h1>
			<input type="text" value={currentData} onChange={(e) => {
				setCurrentData(e.currentTarget.value);
			}} placeholder="Data" />
			<button onClick={() => void handleSave()} disabled={isSaving}>
				{isSaving ? 'Saving...' : 'Save'}
			</button>
		</>
	);
}

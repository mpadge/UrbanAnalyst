export async function loadDataFunction(city: string, handleDataChange: (data: number) => void) {
    const response = await fetch(`/api/ghHiResData?city=${city}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    handleDataChange(data);
}


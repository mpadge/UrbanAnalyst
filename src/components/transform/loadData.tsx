export async function loadDataFunction(city: string, targetCity: string, handleData1Change: (data: number) => void, handleData2Change: (data: number) => void) {
    const response1 = await fetch(`/api/gh?city=${city}`);
    if (!response1.ok) {
        throw new Error(`HTTP error! status: ${response1.status}`);
    }
    const data1 = await response1.json();
    handleData1Change(data1);

    const response2 = await fetch(`/api/gh?city=${targetCity}`);
    if (!response2.ok) {
        throw new Error(`HTTP error! status: ${response2.status}`);
    }
    const data2 = await response2.json();
    handleData2Change(data2);
}


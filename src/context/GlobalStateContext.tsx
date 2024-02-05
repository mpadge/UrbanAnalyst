import { createContext, useContext, useEffect, useState } from 'react';

interface GlobalState {
    mapTour: boolean;
    exampleVariable: string;
}

interface GlobalStateProviderProps {
    children: React.ReactNode;
}

const GlobalStateContext = createContext<{
    globalState: GlobalState;
    setMapTour: (mapTour: boolean) => void;
    setExampleVariable: (exampleVariable: string) => void;
}>({
    globalState: { mapTour: true, exampleVariable: '' },
    setMapTour: () => { },
    setExampleVariable: () => { }
});

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider: React.FC <GlobalStateProviderProps> = ({ children }) => {

    const [exampleVariable, setExampleVariable] = useState('');
    const [mapTour, setMapTour] = useState(true);

    console.log("-----GLOBAL STATE PROVIDER----- with mapTour = ", mapTour);
    useEffect(() => {
        console.log("-----GLOBAL STATE PROVIDER UPDATE----- with mapTour = ", mapTour);
    }, [mapTour]);

    useEffect(() => {
        console.log("GlobalStateProvider mounted");
        return () => {
            console.log("GlobalStateProvider unmounted");
        };
    }, []);

    return (
        <GlobalStateContext.Provider value={{ globalState: { mapTour, exampleVariable }, setMapTour, setExampleVariable }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

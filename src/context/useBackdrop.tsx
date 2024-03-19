import React, {createContext, ReactNode, useContext, useState} from 'react';
import DefaultBackdrop from '../components/Backdrop/DefaultBackdrop';

interface BackdropContextType {
    backdropOpen: boolean;
    openBackdrop: (message?: string) => void;
    closeBackdrop: () => void;
}

const BackdropContext = createContext<BackdropContextType | undefined>(undefined);

export const BackdropProvider = ({children}: { children: ReactNode }) => {
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [backdropMessage, setBackdropMessage] = useState('');

    const openBackdrop = (message?: string) => {
        setBackdropMessage(message || ''); // 如果没有传递消息，则为空字符串
        setBackdropOpen(true);
    };

    const closeBackdrop = () => {
        setBackdropOpen(false);
    };

    const value: BackdropContextType = {
        backdropOpen,
        openBackdrop,
        closeBackdrop
    };

    return (
        <BackdropContext.Provider value={value}>
            {children}
            <DefaultBackdrop open={backdropOpen} message={backdropMessage}/>
        </BackdropContext.Provider>
    );
};

export default function useBackdrop () {
    // const context = useContext(BackdropContext);
    // if (!context) {
    //     throw new Error('useBackdrop must be used within a BackdropProvider');
    // }
    // return context;
    return useContext(BackdropContext) as BackdropContextType;
};
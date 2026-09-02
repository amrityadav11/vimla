import { createContext, useContext, useState, useEffect } from 'react';
import { settingsApi } from '../services/api';

const SettingsContext = createContext({});

const defaultSettings = {
    businessName: 'विमला जाँच घर',
    businessNameEn: 'Vimla Janch Ghar',
    tagline: 'Reliable Diagnostics. Trusted Care.',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    email: 'info@vimlajanch.com',
    address: 'Near Main Market, Your City',
    openingHours: 'Mon–Sat: 7:00 AM – 8:00 PM | Sun: 8:00 AM – 2:00 PM',
    googleMapsUrl: 'https://maps.google.com/',
    homeCollection: false,
    showPrices: true,
    aboutText: 'विमला जाँच घर is a local diagnostic and pathology testing centre providing laboratory investigation and reporting services.',
    disclaimer: 'Information provided on this website is for general informational purposes only and should not be considered medical advice or a diagnosis.',
};

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(defaultSettings);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        settingsApi.getPublic()
            .then(res => {
                if (res.data?.data) setSettings({ ...defaultSettings, ...res.data.data });
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const getWhatsAppLink = (message = '') => {
        const num = settings.whatsapp || '919876543210';
        const msg = encodeURIComponent(message || `Hello विमला जाँच घर, I would like to enquire about a laboratory test.`);
        return `https://wa.me/${num}?text=${msg}`;
    };

    return (
        <SettingsContext.Provider value={{ settings, setSettings, loading, getWhatsAppLink }}>
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => useContext(SettingsContext);

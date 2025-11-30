import React, { useState, useEffect, useCallback } from 'react';
import { ACHIEVEMENTS, MAX_LEVEL } from './constants/gameData';

import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';

import LandingScreen from './screens/LandingScreen';
import AuthScreen from './screens/AuthScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import MainApp from './screens/MainApp';

export default function App() {
    const [screen, setScreen] = useState('landing');
    const [user, setUser] = useState(null);
    const [appData, setAppData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [voucher, setVoucher] = useState(null);
    const [artificialDate, setArtificialDate] = useState(() => localStorage.getItem('budgetQuestDate') || null);
    const [notification, setNotification] = useState(null);

    const showNotification = useCallback((message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    }, []);

    const getTodaysDate = useCallback(() => {
        return artificialDate ? new Date(artificialDate + "T00:00:00") : new Date();
    }, [artificialDate]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setAppData(docSnap.data());
                    setScreen('app');
                } else {
                    setScreen('onboarding');
                }
            } else {
                setUser(null);
                setAppData(null);
                setScreen('landing');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (appData && user) {
            const saveData = async () => {
                const docRef = doc(db, "users", user.uid);
                await setDoc(docRef, appData, { merge: true });
            };
            saveData();
        }
    }, [appData, user]);

    useEffect(() => {
        if (artificialDate && user) {
            localStorage.setItem(`budgetQuestDate_${user.uid}`, artificialDate);
        }
    }, [artificialDate, user]);

    const createNewUserData = (name, settings = { frequency: 'monthly' }) => ({
        profile: { name, level: 1, xp: 0, completedZones: [], achievements: [], settings },
        transactions: [],
        budgets: [],
    });

    const handleOnboardingFinish = async (settings) => {
        const defaultName = user.email.split('@')[0];
        const newData = createNewUserData(defaultName, settings);
        setAppData(newData);
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, newData);
        setScreen('app');
    };

    const handleLogout = () => {
        signOut(auth);
    };

    // --- THIS FUNCTION HAS BEEN MODIFIED ---
    const handleReset = () => {
        if (window.confirm("This will replace your Firestore data with a blank slate. Are you sure?")) {
            const defaultName = user.email.split('@')[0];
            setAppData(createNewUserData(defaultName));

            // --- ADDED: Reset the artificial date ---
            setArtificialDate(null);
            // --- ADDED: Clear the saved date from storage ---
            if (user) {
                localStorage.removeItem(`budgetQuestDate_${user.uid}`);
            }
        }
    };

    const awardXp = (profile, amount) => {
        if (!profile || profile.level >= MAX_LEVEL) return;
        profile.xp += amount;
        let xpForNextLevel = profile.level * 100;
        while (profile.xp >= xpForNextLevel && profile.level < MAX_LEVEL) {
            profile.level++;
            profile.xp -= xpForNextLevel;
            xpForNextLevel = profile.level * 100;
        }
    };

    const updateAppData = (updater) => {
        setAppData(prevData => {
            const xpBefore = prevData?.profile.xp || 0;
            const levelBefore = prevData?.profile.level || 1;
            const base = prevData ? JSON.parse(JSON.stringify(prevData)) : createNewUserData(user.email.split('@')[0]);
            const newData = updater(base) || base;
            for (const [id, ach] of Object.entries(ACHIEVEMENTS)) {
                if (!newData.profile.achievements.includes(id) && ach.condition(newData)) {
                    newData.profile.achievements.push(id);
                    awardXp(newData.profile, ach.xp);
                    if (!voucher) {
                        const vouchers = ['SAVE100', 'FINHERO20', 'QUEST50', 'BUDGETPRO'];
                        setVoucher(vouchers[Math.floor(Math.random() * vouchers.length)]);
                    }
                }
            }
            const totalXpBefore = (levelBefore > 1 ? (levelBefore - 1) * (levelBefore) * 50 : 0) + xpBefore;
            const totalXpAfter = (newData.profile.level > 1 ? (newData.profile.level - 1) * (newData.profile.level) * 50 : 0) + newData.profile.xp;
            if (totalXpAfter > totalXpBefore) {
                const gainedXp = totalXpAfter - totalXpBefore;
                showNotification(`+${gainedXp} XP`);
            }
            return newData;
        });
    };

    if (loading) {
        return <div className="min-h-screen bg-primary-bg flex items-center justify-center text-white font-pixel">Authenticating...</div>;
    }

    if (!user) {
        if (screen === 'auth') return <AuthScreen onLoginSuccess={(loggedInUser) => setUser(loggedInUser)} />;
        return <LandingScreen onStart={() => setScreen('auth')} />;
    }

    if (screen === 'onboarding') {
        return <OnboardingScreen onFinish={handleOnboardingFinish} />;
    }

    if (screen === 'app' && appData) {
        return (
            <div className="flex h-screen">
                <MainApp
                    user={user}
                    appData={appData}
                    updateAppData={updateAppData}
                    onReset={handleReset}
                    onLogout={handleLogout}
                    voucher={voucher}
                    setVoucher={setVoucher}
                    todaysDate={getTodaysDate()}
                    setArtificialDate={setArtificialDate}
                    notification={notification}
                />
            </div>
        );
    }

    return <div className="min-h-screen bg-primary-bg flex items-center justify-center text-white font-pixel">Loading Data...</div>;
}
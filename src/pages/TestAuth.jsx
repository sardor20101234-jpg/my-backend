import React, { useState } from 'react';
import { supabase } from '../supabase';

const TestAuth = () => {
    const [status, setStatus] = useState('');

    const testSignup = async () => {
        setStatus('Attempting signup...');
        const email = `test_${Date.now()}@gmail.com`;
        const password = 'Password123!';

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: 'Test User',
                        username: `tester_${Date.now()}`
                    }
                }
            });

            if (error) {
                setStatus(`Error: ${error.message}`);
                console.error('Signup Error:', error);
            } else {
                setStatus(`Success! User created: ${data.user?.id}`);
                console.log('Signup Success:', data);
            }
        } catch (err) {
            setStatus(`Fatal Error: ${err.message}`);
            console.error('Fatal Catch:', err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white p-4">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-slate-700">
                <h1 className="text-2xl font-bold mb-6 text-center">Supabase Connection Test</h1>
                <button
                    onClick={testSignup}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all"
                >
                    Test Signup
                </button>
                <div className="mt-6 p-4 bg-slate-900 rounded-lg border border-slate-700 break-words text-sm font-mono">
                    <p className="text-slate-400 mb-2">Status:</p>
                    {status || 'Click to test...'}
                </div>
                <p className="mt-4 text-xs text-slate-500 text-center">
                    Check the Browser Console (F12) for detailed logs.
                </p>
            </div>
        </div>
    );
};

export default TestAuth;

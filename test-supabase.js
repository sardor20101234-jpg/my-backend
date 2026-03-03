import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lbpcuoxvxjzirsfhuvsn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicGN1b3h2eGp6aXJzZmh1dnNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NTcwNTgsImV4cCI6MjA4ODAzMzA1OH0.pCyJFdU4UaXFFqfYAcYwWnpqkCigo_2yh8ijmKgnJQk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSignup() {
    console.log('--- Terminal Signup Test (NEW PROJECT) ---');
    const email = `test_${Date.now()}@example.com`;
    const password = 'Password123!';

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: 'New Project Test',
                    username: `user_${Date.now()}`
                }
            }
        });

        if (error) {
            console.error('❌ SIGNUP FAILED:', error.message);
        } else {
            console.log('✅ SIGNUP SUCCESS!');
            console.log('User ID:', data.user?.id);
        }
    } catch (err) {
        console.error('Fatal Catch:', err.message);
    }
}

testSignup();

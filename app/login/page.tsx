'use client';
import { PiXLogoBold } from 'react-icons/pi';
import styles from './Login.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import Link from 'next/dist/client/link';
import { Toast } from '@/components/Toast';

export const LoginPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [showToast, setShowToast] = useState<boolean>(false);
    const router = useRouter();

    const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setShowToast(true);
            router.push('/');
        } catch (error: any) {
            setError('Failed to log in. Please check your email and password.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <div className={styles.logo}>
                    <PiXLogoBold className={`${styles.icon} ${styles.logo}`} />
                </div>
                <h1 className={styles.header}>Sign in to Twitter</h1>
                {error && <div className={styles.error}>{error}</div>}
                <form onSubmit={handleLogin} className={styles.form}>
                    <input
                        type="email"
                        placeholder="Phone, email, or username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button} disabled={!email || !password}>
                        Sign In
                    </button>
                </form>
                <Link href="#" className={styles.forgotPassword}>Forgot password?</Link>
                <div className={styles.signupLink}>Don't have an account? <Link href="/signup">Sign up</Link></div>
            </div>
            {showToast && (
                <div className={styles.toast}>
                    <p>Login successful!</p>
                </div>
            )}
        </div>
    );
}

export default LoginPage;
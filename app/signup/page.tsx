'use client';
import { PiXLogoBold } from 'react-icons/pi';
import styles from './Signup.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/dist/client/link';
import { auth, db } from '@/lib/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth/cordova';
import { doc, setDoc } from 'firebase/firestore';

export const SignUpPage = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();

    const validateForm = ():boolean => {
        if (!fullName || !username || !email || !password) {
            setError('All fields are required.');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSignup = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: fullName });
            console.log(fullName, username, email, password);
            await setDoc(doc(db, 'users', user.uid), {
                fullName,
                username,
                email,
                createdAt: new Date(),
            });
            setSuccess('Account created successfully! Redirecting to login...');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                setError('Email is already in use.');
            } else {
                setError('Failed to create account.');
            }
            console.error('Error creating account:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={styles.signupContainer}>
            <div className={styles.logoContainer}>
                <PiXLogoBold className={styles.logo} />
            </div>
            <h1 className={styles.title}>Join Twitter Today</h1>
            <form onSubmit={handleSignup}className={styles.form}>
                <input className={styles.input} type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <input className={styles.input} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className={styles.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className={styles.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}
                <button type="submit" className={styles.button} disabled={isSubmitting}>
                    {isSubmitting ? 'Signing Up...' : 'Create Account'}
                </button>
            </form>
            <p className={styles.footerText}>
                By signing up, you agree to the{' '}
                <Link href="#termsofservice" className={styles.link}>
                    Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="#privacypolicy" className={styles.link}>
                    Privacy Policy
                </Link>
                , including{' '}
                <Link href="#cookieuse" className={styles.link}>
                    Cookie Use
                </Link>
                .
            </p>
            <p className={styles.footerText}>
                Already have an account?{' '}
                <Link href="/login" className={styles.link}>
                    Log in
                </Link>
            </p>
        </section>
    )
}

export default SignUpPage;
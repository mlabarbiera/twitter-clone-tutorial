'use client'

import { useEffect, useState } from "react";
import styles from "./CookieBanner.module.scss";

export const CookieBanner = () => {
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  const cookieConsent = localStorage.getItem("cookieConsent");
  if (!cookieConsent) {
    setIsVisible(true);
  }
}, []);

const handleDismiss = () => {
  localStorage.setItem("cookieConsent", "true");
  setIsVisible(false);
}

if (!isVisible) {
  return null;
}

  return (
    <div className={styles.cookieBanner}>
        <div className={styles.textContainer}>
            <p className={styles.title}>Welcome to Twitter Clone!</p>
            <p className={styles.text}>We are letting you know that we are changing our URL, but your privacy
                and data protection settings remain the same. For more details, see our Privacy Policy:{' '}
                <a href="https://x.com/en/privacy" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    https://x.com/en/privacy
                </a>
            </p>
        </div>
      <button className={styles.closeButton} onClick={handleDismiss}>
        <span className={styles.closeIcon}>&times;</span>
      </button>
    </div>
  );
}

export default CookieBanner;
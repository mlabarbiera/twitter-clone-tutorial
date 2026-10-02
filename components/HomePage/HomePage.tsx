'use client';
import RightSidebar from "../RightSidebar";
import LeftSidebar from "../LeftSidebar";
import styles from "./HomePage.module.scss";
import MainContent from "../MainContent";

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <LeftSidebar avatarUrl="https://randomuser.me/api/portraits/men/32.jpg" />
      { /* MainContent */}
      <MainContent />
      { /* RightSidebar */}
      <RightSidebar />
    </div>
  );
};

export default HomePage;
import { FaSearch } from 'react-icons/fa';
import styles from './RightSidebar.module.scss'
import Link from 'next/dist/client/link';

const RightSidebar = () => {
  return (
    <div className={styles.rightSidebar}>
      <div className={styles.searchBar}>
        <FaSearch className={styles.searchIcon} />
        <input type="text" placeholder="Search..." className={styles.searchInput} />
      </div>
      <div className={styles.upgradeBanner}>
        <div className={styles.upgradeContent}>
          <h2>Upgrade to Twitter Premium</h2>
          <p>Enjoy additional benefits, zero ads, and the largest reply prioritization.</p>
          <button className={styles.upgradeButton}>Upgrade</button>
        </div>
      </div>
      <div className={styles.trending}>
        <h2>Explore <span className={styles.betaTag}>Beta</span></h2>
        <ul className={styles.trendingList}>
          <li>
            <div className={styles.trendInfo}>
              <span>CSS - 1 hour ago</span>
              <h3>Developer spends 4 hours centering a div, finally gives up</h3>
            </div>
          </li>
          <li>
            <div className={styles.trendInfo}>
              <span>CSS - 3 hours ago</span>
              <h3>Flexbox vs. Grid: The ultimate showdown</h3>
            </div>
          </li>
          <li>
            <div className={styles.trendInfo}>
              <span>Michael LaBarbiera - 1 week ago</span>
              <h3>New <i>Fire Emblem</i> game released - Michael's verdict: amazing!</h3>
            </div>
          </li>
        </ul>
        <Link className={styles.showMore} href="#showMore">Show more</Link>
      </div>
      <div className={styles.whoToFollow}>
        <h2>Who to follow</h2>
        <ul className={styles.followList}>
          <li>
            <div className={styles.userInfo}>
              <img src="https://randomuser.me/api/portraits/men/43.jpg" alt="chiller" />
              <div>
                <h3>chiller</h3>
                <p>@chiller</p>
              </div>
            </div>
            <button className={styles.followButton}>Follow</button>
          </li>
          <li>
            <div className={styles.userInfo}>
              <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="John Doe" />
              <div>
                <h3>John Doe</h3>
                <p>@johndoe</p>
              </div>
            </div>
            <button className={styles.followButton}>Follow</button>
          </li>
          <li>
            <div className={styles.userInfo}>
              <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="Jane Smith" />
              <div>
                <h3>Jane Smith</h3>
                <p>@janesmith</p>
              </div>
            </div>
            <button className={styles.followButton}>Follow</button>
          </li>
        </ul>
        <Link className={styles.showMore} href="#showMore">Show more</Link>
      </div>
      <div className={styles.footerLinks}>
        <Link href="#TermsOfService">Terms of Service</Link> - <Link href="#PrivacyPolicy">Privacy Policy</Link> -{" "}
        <Link href="#CookiePolicy">Cookie Policy</Link> - <Link href="#Accessibility">Accessibility</Link> -{" "}
        <Link href="#AdsInfo">Ads Info</Link> - <Link href="#More">More...</Link>
        <p>© 2026 Twitter, Inc.</p>
      </div>
    </div>
  );
};

export default RightSidebar;
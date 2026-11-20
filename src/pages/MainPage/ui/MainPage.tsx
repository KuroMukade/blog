import { Counter } from 'entities/Counter';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';

import styles from './MainPage.module.scss';

export const MainPage = () => {
  const { t } = useTranslation('main');

  return (
      <Page className={styles.page}>
          <div className={styles.content}>
              <img
                  className={styles.cover}
                  src="/img/main-development-desk.jpg"
                  alt={t('coverAlt')}
                  width={2060}
                  height={763}
              />

              <header className={styles.intro}>
                  <h1>{t('welcomeTitle')}</h1>
                  <p>{t('welcomeDescription')}</p>
              </header>

              <section className={styles.topics}>
                  <h2>{t('topicsTitle')}</h2>
                  <div className={styles.topicGrid}>
                      <article className={styles.topic}>
                          <h3>{t('reactTitle')}</h3>
                          <p>{t('reactDescription')}</p>
                      </article>
                      <article className={styles.topic}>
                          <h3>{t('ssrTitle')}</h3>
                          <p>{t('ssrDescription')}</p>
                      </article>
                  </div>
              </section>

              <section className={styles.example}>
                  <h2>{t('counterTitle')}</h2>
                  <p>{t('counterDescription')}</p>
                  <Counter />
              </section>
          </div>
      </Page>
  );
};

export default MainPage;

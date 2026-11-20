import { useTranslation } from 'react-i18next';

import { RoutePath } from 'shared/config/routeConfig';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Page } from 'widgets/Page/Page';

import styles from './AboutPage.module.scss';

const AboutPage = () => {
  const { t } = useTranslation('about');

  return (
      <Page className={styles.page}>
          <div className={styles.content}>
              <header className={styles.intro}>
                  <h1>{t('О нас')}</h1>
                  <p>{t('intro')}</p>
              </header>

              <section className={styles.section}>
                  <h2>{t('readerTitle')}</h2>
                  <p>{t('readerDescription')}</p>
              </section>

              <section className={styles.section}>
                  <h2>{t('projectTitle')}</h2>
                  <dl className={styles.details}>
                      <div>
                          <dt>{t('ssrTitle')}</dt>
                          <dd>{t('ssrDescription')}</dd>
                      </div>
                      <div>
                          <dt>{t('stateTitle')}</dt>
                          <dd>{t('stateDescription')}</dd>
                      </div>
                      <div>
                          <dt>{t('federationTitle')}</dt>
                          <dd>{t('federationDescription')}</dd>
                      </div>
                  </dl>
              </section>

              <AppLink to={RoutePath.articles_page} className={styles.articlesLink}>
                  {t('readArticles')}
              </AppLink>
          </div>
      </Page>
  );
};

export default AboutPage;

import { useTranslations } from 'next-intl';

const HomePage = () => {
  const t = useTranslations('Home');

  return (
    <div>
      <section className="bg-white px-4 dark:bg-gray-900 my-8 flex justify-center">
        {t(`title`)}
      </section>
      <span className="text-lg text-blue-500 font-bold">{t(`content`)}</span>
    </div>
  );
};
export default HomePage;

import { unstable_setRequestLocale } from 'next-intl/server';

import { getData } from './data';

export default async function ExamplePage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);

  const data = await getData(params.locale);

  return (
    <div>
      <h1>{data.Home.title}</h1>
    </div>
  );
}

export async function generateStaticParams() {
  const locales = ['en', 'pl'];

  return locales.map((locale) => ({
    locale
  }));
}

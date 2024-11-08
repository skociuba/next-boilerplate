'use client';
import { useTranslations } from 'next-intl';

import { usePathname, Link } from '../../../navigation';
const NavLinks = [
  { id: 1, name: 'home', path: '/' },
  { id: 2, name: 'example', path: '/example' },
  { id: 3, name: 'static', path: '/static' }
];

const Navbar = () => {
  const pathname = usePathname();
  const t = useTranslations('Navbar');
  const isActive = (path) => path === pathname;

  return (
    <nav className="flex h-20 w-full items-center justify-between border-b border-black">
      <div className="logo">
        <Link href="/">
          <p className="text-2xl font-bold">
            Boiler<span className="text-blue-500">Plate</span>
          </p>
        </Link>
      </div>
      <ul className="flex space-x-10">
        {NavLinks.map((link) => (
          <li key={link.id}>
            <Link
              href={link.path}
              className={
                isActive(link.path)
                  ? 'underline underline-offset-[32px]  decoration-blue-500 decoration-2'
                  : ''
              }
            >
              {t(`links.${link.name}`)}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex space-x-10">
        <Link href={pathname} locale="pl">
          {t(`language.pl`)}
        </Link>
        <Link href={pathname} locale="en">
          {t(`language.en`)}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

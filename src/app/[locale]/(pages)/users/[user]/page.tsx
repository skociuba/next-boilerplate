import { UserPosts } from '../../../components/PageComponents/UserPosts';

interface Props {
  params: {
    user: string;
  };
}

export default function Page({ params }: Props) {
  return (
    <section>
      <h1>{params.user}</h1>
      <UserPosts user={params.user} />
    </section>
  );
}

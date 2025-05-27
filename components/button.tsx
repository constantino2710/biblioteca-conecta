import { Link } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

type ButtonLinkProps = {
  title: string;
  href: string;
};

export default function ButtonLink({ title, href }: ButtonLinkProps) {
  return (
    <Link href={href as any} asChild>
      <TouchableOpacity className="bg-[#262c35] active:bg-[#434242] h-[3rem] rounded-lg items-center justify-center w-full mb-4">
        <Text className="text-white font-semibold text-base">{title}</Text>
      </TouchableOpacity>
    </Link>
  );
}

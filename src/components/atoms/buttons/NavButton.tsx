import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "./Button";

interface Props {
  children: React.ReactNode;
  href: string;
  goBack?: boolean;
}

const StyledButton = styled(Button)`
  width: fit-content;
`;
const NavButton = ({ children, href, goBack }: Props) => {
  const router = useRouter();

  if (goBack) {
    return (
      <span onClick={() => router.back()}>
        <StyledButton>{children}</StyledButton>
      </span>
    );
  }
  return (
    <Link href={href}>
      <span>
        <Button>{children}</Button>
      </span>
    </Link>
  );
};
export default NavButton;

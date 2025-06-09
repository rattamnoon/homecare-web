"use client";

import { withTheme } from "@/components/layout/MainLayout";
import { Routes } from "@/config/routes";
import styled from "@emotion/styled";
import { Button, Result } from "antd";
import { useRouter } from "nextjs-toploader/app";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100svh;
  background-image: url("/images/origin-homecare-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export default function NotFound() {
  const router = useRouter();

  const handleClick = () => {
    router.push(Routes.Home);
  };

  return withTheme(
    <Container>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={handleClick}>
            Back Home
          </Button>
        }
      />
    </Container>
  );
}

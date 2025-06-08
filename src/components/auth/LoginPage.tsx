"use client";

import { LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Card, Form, Input } from "antd";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type LoginForm = {
  username: string;
  password: string;
};

const Background = styled.div`
  min-height: 100svh;
  background-image: url("/images/origin-homecare-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: calc(1rem * 2);
`;

export const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm<LoginForm>();
  const [loading, setLoading] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onFinish = async (values: LoginForm) => {
    setLoading(true);
    const result = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      form.setFields([
        {
          name: "password",
          errors: [result.error],
        },
      ]);
      setLoading(false);
    }

    if (result?.ok) {
      router.push(callbackUrl);
      setLoading(false);
    }
  };

  return (
    <Background>
      <Image
        src="/images/origin-vertical-logo.png"
        width={200}
        height={50}
        alt="logo-login"
        style={{ objectFit: "contain" }}
      />
      <Card style={{ minWidth: 400 }}>
        <Form
          form={form}
          name="login-form"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="username"
            label="ชื่อผู้ใช้งาน"
            rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้งาน" }]}
            required={false}
          >
            <Input placeholder="ชื่อผู้ใช้งาน" addonBefore={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="password"
            label="รหัสผ่าน"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
            required={false}
          >
            <Input.Password
              placeholder="รหัสผ่าน"
              addonBefore={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item noStyle>
            <Button
              variant="solid"
              color="primary"
              htmlType="submit"
              loading={loading}
              icon={<LoginOutlined />}
              block
            >
              เข้าสู่ระบบ
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Background>
  );
};

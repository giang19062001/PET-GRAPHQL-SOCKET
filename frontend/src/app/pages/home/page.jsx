"use client";
import HomeComponent from "@/app/components/home";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container style={{ marginTop: 20, marginBottom: 20 }}>
      <HomeComponent></HomeComponent>
    </Container>
  );
}

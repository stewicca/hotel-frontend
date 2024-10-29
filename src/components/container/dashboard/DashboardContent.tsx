'use client';
import { useUserContext } from "@/app/user-provider";

export default function DashboardContent() {
  const { user } = useUserContext();
  return (
    <h1 className="text-2xl text-gray-500 font-semibold font-mono">Hello <span className="uppercase">{user?.username}</span></h1>
  );
};